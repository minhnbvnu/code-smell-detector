async function probeCt (name, value) {
      clargs.verbose && this.log(`${clargs.light}: ${name} ...\\c`)
      await this.hueClient.put(clargs.light + '/state', { ct: value })
      let count = 0
      return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          const ct = await this.hueClient.get(clargs.light + '/state/ct')
          if (ct !== value || ++count > clargs.maxCount) {
            clearInterval(interval)
            clargs.verbose && this.logc(
              count > clargs.maxCount ? ' timeout' : ' done'
            )
            return resolve(ct)
          }
          clargs.verbose && this.logc('.\\c')
        }, 5000)
      })
    }