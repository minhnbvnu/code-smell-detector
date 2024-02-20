function onPortMessage({
            payload,
            source
          }) {
            if (source === 'react-devtools-content-script') {
              switch (payload === null || payload === void 0 ? void 0 : payload.type) {
                case 'fetch-file-with-cache-complete':
                  chrome.runtime.onMessage.removeListener(onPortMessage);
                  resolve(payload.value);
                  break;

                case 'fetch-file-with-cache-error':
                  chrome.runtime.onMessage.removeListener(onPortMessage);
                  reject(payload.value);
                  break;
              }
            }
          }