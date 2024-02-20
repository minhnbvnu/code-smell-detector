async function submitVerification (json, name, address, compiler, constructorArgs) {
  // Check if it's already verified
  if (await isVerified(address)) {
    console.log(`${name} is already verified`)
    return
  }

  const payload = {
    apikey: API_KEY,
    module: 'contract',
    action: 'verifysourcecode',
    contractaddress: address,
    sourceCode: JSON.stringify(json),
    codeformat: 'solidity-standard-json-input',
    contractname: name,
    compilerversion: 'v' + compiler,
    optimizationUsed: 0, // unused
    runs: 200, // unused
    evmversion: '', // unused
    constructorArguements: constructorArgs,
    licenseType: LICENSE,
    libraryname1: '',
    libraryaddress1: '',
    libraryname2: '',
    libraryaddress2: '',
    libraryname3: '',
    libraryaddress3: '',
    libraryname4: '',
    libraryaddress4: '',
    libraryname5: '',
    libraryaddress5: '',
    libraryname6: '',
    libraryaddress6: '',
    libraryname7: '',
    libraryaddress7: '',
    libraryname8: '',
    libraryaddress8: '',
    libraryname9: '',
    libraryaddress9: '',
    libraryname10: '',
    libraryaddress10: '',
  }
  // Build form data
  const formData = querystring.stringify(payload)
  // Submit to etherscan api
  console.log(`Attempting to verify ${name} at ${address}`)
  const result = await axios.post(apiEndpoint(NETWORK), formData)
  // Check result
  if (result.data.status !== '1') {
    console.error(`Something went wrong`)
    console.log(result.data)
    process.exit()
  } else {
    console.log(`Receipt GUID is ${result.data.result}`)
  }
}