function compress(css) {
    if (config.optimizeCss == 'none') {
      return css;
    }
    
    if (typeof process !== "undefined" && process.versions && !!process.versions.node && require.nodeRequire) {
      try {
        var csso = require.nodeRequire('csso');
      }
      catch(e) {
        console.log('Compression module not installed. Use "npm install csso -g" to enable.');
        return css;
      }
      var csslen = css.length;
      try {
        if (typeof csso.minify === 'function') {
            var minifyResult = csso.minify(css);
            if (typeof minifyResult === 'string'){ // for csso < 2.0.0
              css = minifyResult; 
            } else if (typeof minifyResult === 'object'){ // for csso >= 2.0.0
              css = minifyResult.css; 
            } 
        } else { // justDoIt() was always. minify() appeared in csso 1.4.0.
          css = csso.justDoIt(css);
        }
      }
      catch(e) {
        console.log('Compression failed due to a CSS syntax error.');
        return css;
      }
      console.log('Compressed CSS output to ' + Math.round(css.length / csslen * 100) + '%.');
      return css;
    }
    console.log('Compression not supported outside of nodejs environments.');
    return css;
  }