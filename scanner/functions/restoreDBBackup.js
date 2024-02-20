function restoreDBBackup (event, file, targetTable) {
  return new Promise((resolve, reject) => {
    let open = 1

    function pass () {
      if (open > 0 && --open === 0) {
        console.log('Users backed up, ending upload stream and returning')
        resolve()
      }
    }

    function fail (e) {
      if (open > 0) {
        open = 0
        console.error('An error occurred', e)
        reject(e)
      }
    }

    async function tryWrite (items) {
      let retry = false
      let delay = 500

      while (items.length) {
        if (retry) await new Promise(resolve => setTimeout(resolve, delay))
        const resp = await dynamodb.batchWriteItem({
          RequestItems: { [targetTable]: items }
        }).promise()

        delay *= 2
        items = resp.UnprocessedItems
        retry = true
      }
    }

    let buffer = []

    async function loop () {
      for await (const line of await readMigrateLines(event, file)) {
        if (open === 0) break
        if (line) {
          const record = JSON.parse(line)

          // 25 = max batch size
          if (buffer.length < 25) {
            buffer.push(record)
          } else {
            const items = buffer
            buffer = []
            open++
            tryWrite(items.map(item => ({ PutRequest: { Item: item } }))).then(pass, fail)
          }
        }
      }
    }

    open++
    loop().then(pass, fail)
    pass()
  })
}