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