function isCodeSample(elm) {
      return elm && elm.nodeName === 'PRE' && elm.className.indexOf('language-') !== -1;
    }