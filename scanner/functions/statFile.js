function statFile() {
      fs.stat(file, (err, stat) => {
        if (err && (err.code === 'ENOENT' || err.code === 'ENOTDIR')) {
          if (req.statusCode === 404) {
            // This means we're already trying ./404.html and can not find it.
            // So send plain text response with 404 status code
            status[404](res, next);
          } else if (!path.extname(parsed.pathname).length && defaultExt) {
            // If there is no file extension in the path and we have a default
            // extension try filename and default extension combination before rendering 404.html.
            middleware({
              url: `${parsed.pathname}.${defaultExt}${(parsed.search) ? parsed.search : ''}`,
              headers: req.headers,
            }, res, next);
          } else {
            // Try to serve default ./404.html
            const rawUrl = (handleError ? `/${path.join(baseDir, `404.${defaultExt}`)}` : req.url);
            const encodedUrl = ensureUriEncoded(rawUrl);
            middleware({
              url: encodedUrl,
              headers: req.headers,
              statusCode: 404,
            }, res, next);
          }
        } else if (err) {
          status[500](res, next, { error: err });
        } else if (stat.isDirectory()) {
          if (!autoIndex && !opts.showDir) {
            status[404](res, next);
            return;
          }


          // 302 to / if necessary
          if (!pathname.match(/\/$/)) {
            res.statusCode = 302;
            const q = parsed.query ? `?${parsed.query}` : '';
            const d = `${parsed.pathname}/${q}`;
            res.setHeader('location', ensureUriEncoded(d));
            res.end();
            return;
          }

          if (autoIndex) {
            middleware({
              url: urlJoin(
                encodeURIComponent(pathname),
                `/index.${defaultExt}`
              ),
              headers: req.headers,
            }, res, (autoIndexError) => {
              if (autoIndexError) {
                status[500](res, next, { error: autoIndexError });
                return;
              }
              if (opts.showDir) {
                showDir(opts, stat)(req, res);
                return;
              }

              status[403](res, next);
            });
            return;
          }

          if (opts.showDir) {
            showDir(opts, stat)(req, res);
          }
        } else {
          serve(stat);
        }
      });
    }