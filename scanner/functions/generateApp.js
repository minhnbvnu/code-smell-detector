function generateApp(t) {
  const express = require('express')
  const bodyParser = require('body-parser')

  const app = express()
  app.use(bodyParser.json())

  app.post('/test', function controller(req, res) {
    const timeout = setTimeout(() => {
      const err = new Error('should not hit this as request was aborted')
      t.error(err)

      res.status(200).send('OK')
    }, req.body.timeout)

    res.on('close', () => {
      t.comment('cancelling setTimeout')
      clearTimeout(timeout)
    })
  })

  return app
}