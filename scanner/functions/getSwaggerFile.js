async function getSwaggerFile (file) {
  const params = {
    Bucket: bucketName,
    Key: file.Key,
    ExpectedBucketOwner: process.env.SourceAccount
  }

  const s3Repr = await exports.s3.getObject(params).promise()

  console.log(`Processing file: ${file.Key}`)
  let body

  try {
    // s3Repr.Body is a buffer, so we call toString()
    body = JSON.parse(s3Repr.Body.toString())
  } catch (jsonErr) {
    try {
      body = yaml.safeLoad(s3Repr.Body.toString())
    } catch (yamlErr) {
      throw new Error(`Could not parse file ${file.Key}
          YAML parse error: ${yamlErr}
          JSON parse error: ${jsonErr}`)
    }
  }
  const id = hash(body)
  let apiId, apiStage

  // if the file was saved with its name as an API_STAGE key, we should use that
  // from strings like catalog/a1b2c3d4e5_prod.json, remove catalog and .json
  // we can trust that there's not a period in the stage name, as API GW doesn't allow that
  const match = /^catalog\/(?:unsubscribable_)?([a-zA-Z0-9]{10})_(.*)\.json$/.exec(file.Key)
  const generic = match == null
  if (generic) {
    // if the file wasn't saved with its name as an API_STAGE key, assume it's a generic api
    console.log(`Generic Swagger definition found: ${file.Key}`)
  } else {
    [, apiId, apiStage] = match
    if (file.Key.startsWith('catalog/unsubscribable_')) {
      console.log(`Unsubscribable API found: ${file.Key}.`)
    } else {
      console.log(`Subscribable API found: ${file.Key}.`)
    }
  }

  return { id, body, apiId, apiStage, generic }
}