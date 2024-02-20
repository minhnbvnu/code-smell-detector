function waitForTheNetwork() {
          const socket = (_net || _load_net()).default.createConnection(connectionOptions);

          socket.on('error', () => {
            // catch & ignore, the retry is handled in 'close'
          });

          socket.on('close', () => {
            startServer();
          });
        }