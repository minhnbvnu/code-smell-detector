function handleRequestResponse (error, response, body) {
          var result = {}
          var status
          var data
          var type

          // Handle pure error
          if (error && !response) {
            result.error = error

            if (handleRetriableRequestResponse(result) && callback) {
              callback(result)
            }

            return
          }

          // Handle No Response...
          // This is weird.
          if (!response) {
            console.log('This is odd, report this action / request to: http://github.com/mashape/unirest-nodejs')

            result.error = {
              message: 'No response found.'
            }

            if (handleRetriableRequestResponse(result) && callback) {
              callback(result)
            }

            return
          }

          // Create response reference
          result = response

          // Create response status reference
          status = response.statusCode

          // Normalize MSIE response to HTTP 204
          status = (status === 1223 ? 204 : status)

          // Obtain status range typecode (1, 2, 3, 4, 5, etc.)
          type = status / 100 | 0

          // Generate sugar helper properties for status information
          result.code = status
          result.status = status
          result.statusType = type
          result.info = type === 1
          result.ok = type === 2
          result.clientError = type === 4
          result.serverError = type === 5
          result.error = (type === 4 || type === 5) ? (function generateErrorMessage () {
            var msg = 'got ' + result.status + ' response'
            var err = new Error(msg)
            err.status = result.status
            return err
          })() : false

          // Iterate over Response Status Codes and generate more sugar
          for (var name in Unirest.Response.statusCodes) {
            result[name] = Unirest.Response.statusCodes[name] === status
          }

          // Cookie Holder
          result.cookies = {}

          // Cookie Sugar Method
          result.cookie = function (name) {
            return result.cookies[name]
          }

          function setCookie (cookie) {
            var crumbs = Unirest.trim(cookie).split('=')
            var key = Unirest.trim(crumbs[0])
            var value = Unirest.trim(crumbs.slice(1).join('='))

            if (crumbs[0] && crumbs[0] !== '') {
              result.cookies[key] = value === '' ? true : value
            }
          }

          if (response.cookies && is(response.cookies).a(Object) && Object.keys(response.cookies).length > 0) {
            result.cookies = response.cookies
          } else {
            // Handle cookies to be set
            var cookies = response.headers['set-cookie']
            if (cookies && is(cookies).a(Array)) {
              for (var index = 0; index < cookies.length; index++) {
                var entry = cookies[index]

                if (is(entry).a(String) && does(entry).contain(';')) {
                  entry.split(';').forEach(setCookie)
                }
              }
            }

            // Handle cookies that have been set
            cookies = response.headers.cookie
            if (cookies && is(cookies).a(String)) {
              cookies.split(';').forEach(setCookie)
            }
          }

          // Obtain response body
          body = body || response.body
          result.raw_body = body
          result.headers = response.headers

          // Handle Response Body
          if (body) {
            type = Unirest.type(result.headers['content-type'], true)
            if (type) data = Unirest.Response.parse(body, type)
            else data = body
          }

          result.body = data

          ;(handleRetriableRequestResponse(result)) && (callback) && callback(result)
        }