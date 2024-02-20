function killSockets() {
            try {
              server.close();
            } catch (err) {
              // best effort
            }

            for (var _iterator = clients, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref2;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref2 = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref2 = _i.value;
              }

              const socket = _ref2;

              try {
                socket.destroy();
              } catch (err) {
                // best effort
              }
            }

            // If the process hasn't exited in the next 5s, it has stalled and we abort
            const timeout = setTimeout(() => {
              console.error('Process stalled');
              if (process._getActiveHandles) {
                console.error('Active handles:');
                // $FlowFixMe: getActiveHandles is undocumented, but it exists
                for (var _iterator2 = process._getActiveHandles(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                  var _ref3;

                  if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref3 = _iterator2[_i2++];
                  } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref3 = _i2.value;
                  }

                  const handle = _ref3;

                  console.error(`  - ${handle.constructor.name}`);
                }
              }
              // eslint-disable-next-line no-process-exit
              process.exit(1);
            }, 5000);

            // This timeout must not prevent us from exiting
            // $FlowFixMe: Node's setTimeout returns a Timeout, not a Number
            timeout.unref();
          }