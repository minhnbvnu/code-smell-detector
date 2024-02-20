function __NR_wrappedPromisified() {
          const segment = shim.getActiveSegment()
          if (!segment) {
            return promisified.apply(this, arguments)
          }

          const prom = shim.applySegment(promisified, segment, true, this, arguments)
          Contextualizer.link(null, prom, segment)
          return prom
        }