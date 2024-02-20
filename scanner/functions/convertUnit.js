function convertUnit(time) {
  let convertedTime = time
  if (convertedTime > 1e18) {
    // nano seconds
    convertedTime = convertedTime / 1e6
  } else if (convertedTime > 1e15) {
    // micro seconds
    convertedTime = convertedTime / 1e3
  } else if (convertedTime < 1e12) {
    // seconds
    convertedTime = convertedTime * 1e3
  }

  return convertedTime
}