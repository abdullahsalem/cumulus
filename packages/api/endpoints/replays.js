'use strict';

const router = require('express-promise-router')();

const { asyncOperationEndpointErrorHandler } = require('../app/middleware');
const AsyncOperation = require('../models/async-operation');

/**
 * Start an AsyncOperation that will perform kinesis message replay
 *
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 * @returns {Promise<Object>} the promise of express response object
 */
async function startKinesisReplayAsyncOperation(req, res) {
  const asyncOperationModel = new AsyncOperation({
    stackName: process.env.stackName,
    systemBucket: process.env.system_bucket
  });

  const payload = req.body;

  if (!payload.type) {
    return res.boom.badRequest('replay type is required');
  }

  if (payload.type === 'kinesis' && !payload.kinesisStream) {
    return res.boom.badRequest('kinesisStream is required for kinesis-type replay');
  }

  const input = {
    CollectionsTable: process.env.CollectionsTable,
    RulesTable: process.env.RulesTable,
    ProvidersTable: process.env.ProvidersTable,
    stackName: process.env.stackName,
    system_bucket: process.env.system_bucket,
    FallbackTopicArn: process.env.KinesisFallbackTopicArn,
    ...payload
  };

  const asyncOperation = await asyncOperationModel.start({
    asyncOperationTaskDefinition: process.env.AsyncOperationTaskDefinition,
    cluster: process.env.EcsCluster,
    lambdaName: process.env.ManualConsumerLambda,
    description: 'Kinesis Replay',
    operationType: 'Kinesis Replay',
    payload: input
  });

  return res.status(202).send({ asyncOperationId: asyncOperation.id });
}

router.post('/', startKinesisReplayAsyncOperation, asyncOperationEndpointErrorHandler);

module.exports = router;
