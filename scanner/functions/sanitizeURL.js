function sanitizeURL(url) {
              {
                if (!didWarn && isJavaScriptProtocol.test(url)) {
                  didWarn = true;
                  error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url));
                }
              }
            }