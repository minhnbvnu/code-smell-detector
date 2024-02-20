function handleRetriableRequestResponse (result) {

          // If retries is not defined or all attempts tried, return true to invoke end's callback.
          if ($this.options.retry === undefined || $this.options.retry.attempts === 0) {
            return true
          }

          // If status code is not listed, abort with return true to invoke end's callback.
          var isStatusCodeDefined = (function (code, codes) {

            if (codes.indexOf(code) !== -1) {
              return true
            }

            return codes.reduce(function (p, c) {
                return p || String(code).split("").every(function (ch, i) {
                  return ch === "x" || ch === c[i]
                })
              }, false)

          }(result.code || result.error && result.error.code, $this.options.retry.statusCodes))

          if (!isStatusCodeDefined) {
            return true
          }

          if ($this.options.retry.callback) {
            var isContinue = $this.options.retry.callback(result)
            // If retry callback returns false, stop retries and invoke end's callback.
            if (isContinue === false) {
              return true;
            }
          }

          setTimeout(function () {
            self.end(callback)
          }, $this.options.retry.delayInMs)

          $this.options.retry.attempts--
          $this.options.retry.delayInMs *= $this.options.retry.delayMulti

          // Return false to not invoke end's callback.
          return false
        }