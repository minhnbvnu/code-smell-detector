function decodeTraceData(encodedArray, callback) {
  let toDecode = encodedArray.length
  const decoded = []

  encodedArray.forEach(function (data) {
    const element = data[4]
    codec.decode(element, function (error, extracted) {
      if (error) {
        return callback(error)
      }

      decoded.push(extracted)
      toDecode -= 1
      if (toDecode < 1) {
        callback(null, decoded)
      }
    })
  })
}