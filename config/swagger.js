import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Express MongoDB API',
      version: '1.0.0',
      description: 'API documentation for the Node Express MongoDB project',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpecs = swaggerJsdoc(options);
export default swaggerSpecs;