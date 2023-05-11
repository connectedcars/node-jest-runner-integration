describe('First', () => {
  it('should pass the test', async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(1).toEqual(1)
  })
})
