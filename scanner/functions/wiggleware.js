function wiggleware(req, res, next) {
        const harbl = null
        harbl.bargl() // OHHH NOOOOO

        return next() // will never get here
      }