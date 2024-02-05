// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/fileTransformer.js', // Agrega esta línea
    },
  };
  