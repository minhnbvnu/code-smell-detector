function separateProcessors(processorData) {
  const processors = []
  let processor = Object.create(null)
  for (let i = 0; i < processorData.length; ++i) {
    const key = processorData[i][0]
    const value = processorData[i][1]
    if (processor[key] !== undefined) {
      processors.push(processor)
      processor = Object.create(null)
    }
    processor[key] = value
  }
  processors.push(processor)
  return processors
}