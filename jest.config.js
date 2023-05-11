module.exports = {
  ...require('./node_modules/@connectedcars/setup/jest.config.js'),
  runner: require.resolve('./build/dist/src'),
  globalSetup: './src/test-setup.ts',
  globalTeardown: './src/test-teardown.ts',
  roots: ['<rootDir>/src']
}
