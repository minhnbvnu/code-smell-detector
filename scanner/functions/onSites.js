function onSites (err, _sites) {
      if (err) return next(err)

      /**
       * calculate maximum screenshot width, used for scaling
       */

      var maxWidth
      app.get('resolutions').forEach(function (resolution) {
        var width = parseInt(resolution.split('x')[0], 10)
        if (!maxWidth || width > maxWidth) maxWidth = width
      })

      /**
       * add css information to resolutions
       */

      var resolutions = app.get('resolutions').map(function (resolution) {
        var width = parseInt(resolution.split('x')[0], 10)

        return {
          name : resolution,
          width : (width / maxWidth * 100) + '%',
          maxWidth : width + 'px'
        }
      })

      /**
       * encode sites' URLs to be URL-safe
       */

      var sites = {}
      Object.keys(_sites).forEach(function (title) {
        sites[title] = encodeURIComponent(_sites[title])
      })

      /**
       * render
       */

      res.render('index', {
        sites : sites,
        resolutions : resolutions,
        expires : app.get('cache')? span(app.get('cache').expires * 1000) : null
      })
    }