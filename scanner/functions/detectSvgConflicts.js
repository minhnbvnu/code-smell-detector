function detectSvgConflicts(currentScript) {
    var scripts = Array.from(DOCUMENT.scripts).filter(function (t) {
      return !t.hasAttribute(detectionIgnoreAttr) && t !== currentScript;
    });
    var scriptsByMD5 = {};

    var _loop = function _loop(scriptIdx) {
      var diagFrame = DOCUMENT.createElement('iframe');
      diagFrame.setAttribute('style', 'display:none;');
      var scriptUnderTest = DOCUMENT.createElement('script');
      scriptUnderTest.setAttribute('id', nodeUnderTestId);
      var md5ForScript = md5ForNode(scripts[scriptIdx]);
      scriptUnderTest.setAttribute(md5Attr, md5ForScript);
      scriptsByMD5[md5ForScript] = scripts[scriptIdx];

      if (scripts[scriptIdx].src !== '') {
        scriptUnderTest.src = scripts[scriptIdx].src;
      }

      if (scripts[scriptIdx].innerText !== '') {
        scriptUnderTest.innerText = scripts[scriptIdx].innerText;
      }

      scriptUnderTest.async = true;
      var diagScript = DOCUMENT.createElement('script');
      diagScript.setAttribute('id', diagScriptId);
      var parentOrigin = WINDOW.location.origin === 'file://' ? '*' : WINDOW.location.origin;

      var diagScriptFun = function diagScriptFun(nodeUnderTestId, md5, parentOrigin) {
        parent.FontAwesomeDetection.__pollUntil({
          fn: function fn() {
            return !!window.FontAwesomeConfig || !!window.FontAwesomeKitConfig;
          }
        }).then(function () {
          var scriptNode = document.getElementById(nodeUnderTestId);
          parent.postMessage({
            type: 'fontawesome-conflict',
            technology: 'js',
            src: scriptNode.src,
            innerText: scriptNode.innerText,
            tagName: scriptNode.tagName,
            md5: md5
          }, parentOrigin);
        }).catch(function (e) {
          var scriptNode = document.getElementById(nodeUnderTestId);

          if (e === 'timeout') {
            parent.postMessage({
              type: 'no-conflict',
              src: scriptNode.src,
              innerText: scriptNode.innerText,
              tagName: scriptNode.tagName,
              md5: md5
            }, parentOrigin);
          } else {
            console.error(e);
          }
        });
      };

      diagScript.innerText = "(".concat(diagScriptFun.toString(), ")('").concat(nodeUnderTestId, "', '").concat(md5ForScript, "', '").concat(parentOrigin, "');");

      diagFrame.onload = function () {
        diagFrame.contentWindow.addEventListener('error', silenceErrors, true);
        diagFrame.contentDocument.head.appendChild(diagScript);
        diagFrame.contentDocument.head.appendChild(scriptUnderTest);
      };

      domready(function () {
        return DOCUMENT.body.appendChild(diagFrame);
      });
    };

    for (var scriptIdx = 0; scriptIdx < scripts.length; scriptIdx++) {
      _loop(scriptIdx);
    }

    return scriptsByMD5;
  }