function finiteStream(dataToStream, chunkTemplate) {
  const parts = dataToStream.split(' ')
  let i = 0
  return new Readable({
    read() {
      // This is how the data is streamed from openai
      // The message response only seems to change and mostly
      // a stream of content changes via the delta key
      if (i < parts.length) {
        const content = parts.length - 1 === i ? parts[i] : `${parts[i]} `
        chunkTemplate.choices[0].delta.content = content
        const chunk = JSON.stringify(chunkTemplate)
        this.push(`data: ${chunk}\n\n`)
        i += 1
      } else {
        this.push('data: [DONE]\n\n')
        this.push(null)
      }
    }
  }).pause()
}