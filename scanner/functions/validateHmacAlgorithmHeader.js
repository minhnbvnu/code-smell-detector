function validateHmacAlgorithmHeader(token) {
  const decodedHeader = decodeHeader(token)

  if (!decodedHeader) {
    return false
  }

  if (decodedHeader.typ !== 'JWT') {
    console.log(`Unsupported Typ: ${decodedHeader.typ}`)
    return false
  }

  if (!SUPPORTED_ALGORITHM.includes(decodedHeader.alg)) {
    console.log(
      `Unsupported algorithm: ${
        decodedHeader.alg
      }. Only ${SUPPORTED_ALGORITHM.join(', ')} are supported.`,
    )
    return false
  }

  return true
}