function runSnippet (testConfig, snippets, collectionName) {
  var currentCollectionResponses = newmanResponses[collectionName];

  snippets.forEach((item, index) => {
    var headerSnippet = testConfig.headerSnippet ? testConfig.headerSnippet : '',
      footerSnippet = testConfig.footerSnippet ? testConfig.footerSnippet : '',
      codeSnippet = headerSnippet + item.snippet + footerSnippet;
    it(item.name, function (done) {
      if (testConfig.fileName) {
        fs.writeFileSync(testConfig.fileName, codeSnippet);
      }
      //  bash command string for compiling codeSnippet
      var compile = testConfig.compileScript ? testConfig.compileScript : null,
        //  bash command stirng for run compiled file file
        run = testConfig.runScript ? testConfig.runScript : codeSnippet;

      //  step by step process for compile, run code snippet
      async.waterfall([
        function compileCodeSnippet (next) {
          if (compile) {
            return exec(compile, function (code, stdout, stderr) {
              if (code) {
                return next(JSON.stringify({
                  exitCode: code,
                  message: 'Compile error'
                }));
              }
              if (stderr) {
                return next(JSON.stringify({
                  stderr: stderr,
                  message: 'Compile error'
                }));
              }
              console.log(stdout);
              return next(null);
            });
          }
          return next(null);
        },

        function runCodeSnippet (next) {
          if (run) {
            return exec(run, function (code, stdout, stderr) {
              if (code) {
                return next(code);
              }
              if (stderr) {
                return next(stderr);
              }
              try {
                stdout = JSON.parse(stdout);
              }
              catch (e) {
                console.error(e);
              }
              return next(null, stdout);
            });
          }
        }
      ], function (err, response) {
        var result = [response, currentCollectionResponses[index]];

        if (err) {
          expect.fail(null, null, err);
        }
        else if (typeof result[1] !== 'object' || typeof result[0] !== 'object') {
          expect(result[0].toString().trim()).to.include(result[1].toString().trim());
        }
        const propertiesTodelete = ['cookies', 'headersSize', 'startedDateTime', 'clientIPAddress'],
          headersTodelete = [
            'accept-encoding',
            'user-agent',
            'cf-ray',
            'x-real-ip',
            'x-request-id',
            'kong-request-id',
            'x-request-start',
            'connect-time',
            'x-forwarded-for',
            'content-type',
            'content-length',
            'accept',
            'total-route-time',
            'cookie',
            'kong-cloud-request-id',
            'cache-control',
            'postman-token',
            'accept-language',
            'x-forwarded-port',
            'if-none-match',
            'referer',
            'x-amzn-trace-id',
            'transfer-encoding',
            'cf-connecting-ip',
            'cf-request-id'
          ];
        if (result[0]) {
          propertiesTodelete.forEach(function (property) {
            delete result[0][property];
          });
          if (result[0].headers) {
            headersTodelete.forEach(function (property) {
              delete result[0].headers[property];
            });
          }
        }
        if (result[1]) {
          propertiesTodelete.forEach(function (property) {
            delete result[1][property];
          });
          if (result[1].headers) {
            headersTodelete.forEach(function (property) {
              delete result[1].headers[property];
            });
          }
        }
        expect(result[0]).deep.equal(result[1]);
        return done(null);
      });
    });
  });
}