import * as AWS from 'aws-sdk';

export const inTestMode = () => process.env.NODE_ENV === 'test';

// From https://github.com/localstack/localstack/blob/master/README.md
const localStackPorts: { [key: string ]: number } = {
  stepfunctions: 4585,
  apigateway: 4567,
  cloudformation: 4581,
  cloudwatch: 4582,
  cloudwatchevents: 4582,
  cloudwatchlogs: 4586,
  dynamodb: 4564,
  es: 4571,
  firehose: 4573,
  iam: 4593,
  kinesis: 4568,
  kms: 4599,
  lambda: 4574,
  redshift: 4577,
  route53: 4580,
  s3: 4572,
  secretsmanager: 4584,
  ses: 4579,
  sns: 4575,
  sqs: 4576,
  ssm: 4583,
  sts: 4592
};

/**
 * Test if a given AWS service is supported by LocalStack.
 *
 * @param serviceIdentifier - an AWS service identifier
 *
 * @returns whether the service is supported by LocalStack
 */
function localstackSupportedService(serviceIdentifier: string) {
  return Object.keys(localStackPorts).includes(serviceIdentifier);
}

/**
 * Returns the proper endpoint for a given aws service
 *
 * @param identifier - service name
 *
 * @returns the localstack endpoint
 */
export function getLocalstackEndpoint(identifier: string) {
  const key = `LOCAL_${identifier.toUpperCase()}_HOST`;
  if (process.env[key]) {
    return `http://${process.env[key]}:${localStackPorts[identifier]}`;
  }

  return `http://${process.env.LOCALSTACK_HOST}:${localStackPorts[identifier]}`;
}

/**
 * Create an AWS service object that talks to LocalStack.
 *
 * This function expects that the LOCALSTACK_HOST environment variable will be set.
 *
 * @param Service - an AWS service object constructor function
 * @param options - options to pass to the service object constructor function
 *
 * @returns an AWS service object
 */
function localStackAwsClient<T extends AWS.Service | AWS.DynamoDB.DocumentClient>(
  Service: new (params: object) => T,
  options: object
) {
  if (!process.env.LOCALSTACK_HOST) {
    throw new Error('The LOCALSTACK_HOST environment variable is not set.');
  }

  // @ts-ignore
  const serviceIdentifier = Service.serviceIdentifier;

  const localStackOptions: { [key: string ]: unknown } = {
    ...options,
    accessKeyId: 'my-access-key-id',
    secretAccessKey: 'my-secret-access-key',
    region: 'us-east-1',
    endpoint: getLocalstackEndpoint(serviceIdentifier)
  };

  if (serviceIdentifier === 's3') localStackOptions.s3ForcePathStyle = true;

  return new Service(localStackOptions);
}

/**
 * Create an AWS service object that does not actually talk to AWS.
 *
 * @param Service - an AWS service object constructor function
 * @param options - options to pass to the service object constructor function
 *
 * @returns an AWS service object
 */
export function testAwsClient<T extends AWS.Service | AWS.DynamoDB.DocumentClient>(
  Service: new (params: object) => T,
  options: object
): T {
  // @ts-ignore
  const serviceIdentifier = Service.serviceIdentifier;
  if (localstackSupportedService(serviceIdentifier)) {
    return localStackAwsClient(Service, options);
  }

  return <T>{};
}

class ThrottlingException extends Error {
  readonly code: string;

  constructor() {
    super('ThrottlingException');
    this.code = 'ThrottlingException';
  }
}

/**
 * Return a function that throws a ThrottlingException the first time it is called, then returns as
 * normal any other times.
 *
 * @param fn - the function to throttle
 * @returns the throttled function
 */
export const throttleOnce = (fn: (...args: unknown[]) => unknown) => {
  let throttleNextCall = true;

  return (...args: unknown[]) => {
    if (throttleNextCall) {
      throttleNextCall = false;
      throw new ThrottlingException();
    }

    return fn(...args);
  };
};