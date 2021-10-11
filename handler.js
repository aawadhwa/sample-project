const express = require("express");
const serverless = require("serverless-http");
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();

app.use(express.json());
const YAML = require('yamljs');
const swaggerdoc = path.resolve(__dirname, './apis/openapi.yaml');
const swaggerDocument = YAML.load(swaggerdoc);
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));
const userController = require('./apis/controllers/user-controller')

app.use('/users',userController);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
