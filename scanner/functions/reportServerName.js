function reportServerName() {
          const request = (_http || _load_http()).default.get(connectionOptions, response => {
            const buffers = [];

            response.on('data', buffer => {
              buffers.push(buffer);
            });

            response.on('end', () => {
              try {
                var _JSON$parse = JSON.parse(Buffer.concat(buffers).toString());

                const cwd = _JSON$parse.cwd,
                      pid = _JSON$parse.pid;

                reporter.warn(reporter.lang('waitingNamedInstance', pid, cwd));
              } catch (error) {
                reporter.verbose(error);
                reject(new Error(reporter.lang('mutexPortBusy', connectionOptions.port)));
                return;
              }
              waitForTheNetwork();
            });

            response.on('error', () => {
              startServer();
            });
          });

          request.on('error', () => {
            startServer();
          });
        }