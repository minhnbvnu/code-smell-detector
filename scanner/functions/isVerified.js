async function isVerified (address) {
  const result = await axios.get(`${apiEndpoint(NETWORK)}?module=contract&action=getabi&apikey=${API_KEY}&address=${address}`)
  return result.data.status !== '0'
}