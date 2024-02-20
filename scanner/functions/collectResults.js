function collectResults(result) {
        if (!result) {
          return results
        }
        results.push(result)
        return dataProvider.getNext().then(collectResults)
      }