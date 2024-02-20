function createBackup (event, file, sourceTable) {
  return uploadJsonStream({ event, file, hwm: 16 /* MB */ * 1024 /* KB */ * 1024 /* B */ }, async write => {
    const options = { TableName: sourceTable }

    do {
      console.log('Reading users')
      const resp = await dynamodb.scan(options).promise()

      options.ExclusiveStartKey = resp.LastEvaluatedKey

      for (const item of resp.Items) write(item)
    } while (options.ExclusiveStartKey != null)
  })
}