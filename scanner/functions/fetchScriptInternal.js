function fetchScriptInternal(url, options, Promise) {
  return new Promise(function(resolve, reject) {
    const timeout = options.timeout || 5000;
    const scriptId = getScriptId();
    const script = createScript(url, scriptId);

    const timeoutId = setTimeout(function() {
      reject(new Error('Script request to ' + url + ' timed out'));

      removeScript(scriptId);
    }, timeout);

    const disableTimeout = function(timeoutId) { clearTimeout(timeoutId); };

    script.addEventListener('load', function(e) {
      resolve({ok: true});

      disableTimeout(timeoutId);
      removeScript(scriptId);
    });

    script.addEventListener('error', function(e) {
      reject(new Error('Script request to ' + url + ' failed ' + e));

      disableTimeout(timeoutId);
      removeScript(scriptId);
    });

    appendScript(script);
  });
}