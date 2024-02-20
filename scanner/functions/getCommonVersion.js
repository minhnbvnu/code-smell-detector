function getCommonVersion (cb) {
        request.get(getCommonVersionUrl, {
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
                var version = body.data.v;
                if (version === null) { // 未提交过common
                  cb('first');
                  return;
                }
                var commonVersionJson = {};
                if (Util.existsSync(commonVersionJsonFile)) {
                  try {
                    commonVersionJson = JSON.parse(fs.readFileSync(commonVersionJsonFile).toString());
                  } catch (e) {
                    commonVersionJson = {};
                  }
                }
                // 若没有保存版本的md5或者md5和服务端不一致，则重新请求一下新的map.json
                if (commonVersionJson[app + '_' + commonModule] === undefined
                  || commonVersionJson[app + '_' + commonModule] !== version
                  || !Util.existsSync(path.join(commonCacheFolder, app + '_' + commonModule + '.json'))) {
                  getCommonJson(function (success) {
                    if (success) {
                      compareFileContent();
                      commonVersionJson[app + '_' + commonModule] = version;
                      fs.writeFileSync(commonVersionJsonFile, JSON.stringify(commonVersionJson, null, 2));
                    } else {
                      $.util.log($.util.colors.red('请求' + commonModule + '的map.json出错，请反馈给liweitao'));
                    }
                    cb(true);
                  });
                } else {
                  compareFileContent();
                  cb(true);
                }
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