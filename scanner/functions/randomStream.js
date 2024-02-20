function randomStream(chunkTemplate) {
  return new Readable({
    read(size = 16) {
      const data = crypto.randomBytes(size)
      chunkTemplate.choices[0].delta.content = data.toString('base64')
      this.push('data: ' + JSON.stringify(chunkTemplate) + '\n\n')
    }
  }).pause()
}