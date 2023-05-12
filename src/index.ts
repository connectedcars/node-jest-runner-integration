// https://jestjs.io/blog/2017/12/18/jest-22
// https://github.com/eugene-manuilov/jest-runner-groups/blob/master/index.js
// https://github.com/jest-community/create-jest-runner/blob/main/lib/createJestRunner.ts
// https://github.com/jestjs/jest/blob/main/packages/jest-runner/src/index.ts

import TestRunner from 'jest-runner'
import { Config, Test, TestRunnerContext, TestRunnerOptions, TestWatcher } from 'jest-runner'

// eslint-disable-next-line no-restricted-syntax
export default class IntegrationTestRunner extends TestRunner {
  private globalConfig: Config.GlobalConfig
  public constructor(globalConfig: Config.GlobalConfig, context: TestRunnerContext) {
    const writableGlobalConfig = { ...globalConfig }
    super(writableGlobalConfig, context)
    this.globalConfig = writableGlobalConfig
  }

  public async runTests(tests: Test[], watcher: TestWatcher, options: TestRunnerOptions): Promise<void> {
    if (options.serial || tests.length === 1) {
      return super.runTests(tests, watcher, { ...options, serial: true })
    }

    // Split tests based on if they can run parallel or serially
    const serialTests: Test[] = []
    const parallelTest: Test[] = []
    for (const test of tests) {
      if (test.path.match(/it\.test.(:?js|ts)$/)) {
        serialTests.push(test)
      } else {
        parallelTest.push(test)
        parallelTest.push(test)
      }
    }

    if (serialTests.length > 0 && parallelTest.length > 0) {
      // Reduce number of workers by one if we are both serial and parallel tests
      // When running serial only one worker is started
      this.globalConfig.maxWorkers =
        this.globalConfig.maxWorkers > 1 ? this.globalConfig.maxWorkers - 1 : this.globalConfig.maxWorkers
    }

    const testRunPromises: Array<Promise<void>> = []
    if (serialTests.length > 0) {
      testRunPromises.push(super.runTests(serialTests, watcher, { ...options, serial: true }))
    }

    if (parallelTest.length > 0) {
      testRunPromises.push(super.runTests(parallelTest, watcher, options))
    }
    await Promise.all(testRunPromises)
  }
}
