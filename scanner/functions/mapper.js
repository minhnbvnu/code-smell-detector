function mapper(p) {
          if (typeof p === 'string') {
            return p
          } else if (p.length === 1) {
            return mapper(p[0])
          }
          const first = mapper(p.shift()) // shift === pop_front
          return first + '(?:' + p.map(mapper).join('|') + ')'
        }