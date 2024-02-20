function getCommonJson (cb) {
        request.get(getCommonJsonUrl, {
          qs: {
            app: appId
          }
        }, function (err, res, body) {
          if (err) {
            if (isDebug) {
              console.log(err);
            }
            cb(false);
            return;
          }
          if (res.statusCode === 200 || res.statusCode === 201) {
            try {
              body = JSON.parse(body);
              if (body.no === 0) {
                var data = body.data;
                if (_.isEmpty(body.data)) {
                  cb(false);
                  return;
                }
                fs.writeFileSync(path.join(commonCacheFolder, app + '_' + commonModule + '.json'), JSON.stringify(data, null, 2));
                cb(true);
              } else {
                if (isDebug) {
                  console.log(body);
                }
                cb(false);
              }
            } catch (e) {
              if (isDebug) {
                console.log(e);
              }
              cb(false);
            }
          } else {
            if (isDebug) {
              console.log(res.statusCode);
              console.log(res);
            }
            cb(false);
          }
        });
      }