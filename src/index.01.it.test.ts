describe('First Integration', () => {
  it('should pass the test', async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    expect(process.env.INTEGRATION_STUFF).toEqual('Hello')
  })
})
