function makeRegex(t,a,b,c,d){
      // creates a regular expression matcher for when wildcards and ignore case is used
      return str[d].match(/[\*\?]/) || c == '~' ?
          "/^" + str[d].substring(1,str[d].length-1).replace(/\\([btnfr\\"'])|([^\w\*\?])/g,"\\$1$2").replace(/([\*\?])/g,".$1") + (c == '~' ? '$/i' : '$/') + ".test(" + a + ")" :
          t;
    }