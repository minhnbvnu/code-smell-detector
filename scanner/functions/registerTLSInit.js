function registerTLSInit(tlsInitFunc) {
          PThread.tlsInitFunctions.push(tlsInitFunc);
        }