function decodeHeader(token) {
  const parts = token.split('.')

  try {
    const decodedHeader = JSON.parse(
      Buffer.from(parts[0], 'base64').toString('utf-8'),
    )
    return decodedHeader
    // biome-ignore lint/nursery/noUselessLoneBlockStatements: we actually want to catch possible errors
  } catch (_e) {
    console.log('Invalid token format. Invalid header.')
    return null
  }
}