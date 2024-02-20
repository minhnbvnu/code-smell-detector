function setCookie (cookie) {
            var crumbs = Unirest.trim(cookie).split('=')
            var key = Unirest.trim(crumbs[0])
            var value = Unirest.trim(crumbs.slice(1).join('='))

            if (crumbs[0] && crumbs[0] !== '') {
              result.cookies[key] = value === '' ? true : value
            }
          }