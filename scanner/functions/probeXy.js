async function probeXy (name, value) {
      clargs.verbose && this.log(`${clargs.light}: ${name} ...\\c`)
      await this.hueClient.put(clargs.light + '/state', { xy: value })
      let count = 0
      return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          const xy = await this.hueClient.get(clargs.light + '/state/xy')
          if (
            xy[0] !== value[0] || xy[1] !== value[1] ||
            ++count > clargs.maxCount
          ) {
            clearInterval(interval)
            clargs.verbose && this.logc(
              count > clargs.maxCount ? ' timeout' : ' done'
            )
            return resolve(xy)
          }
          clargs.verbose && this.logc('.\\c')
        }, 5000)
      })
    }