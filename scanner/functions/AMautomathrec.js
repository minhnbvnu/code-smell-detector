function AMautomathrec(str) {
//formula is a space (or start of str) followed by a maximal sequence of *two* or more tokens, possibly separated by runs of digits and/or space.
//tokens are single letters (except a, A, I) and ASCIIMathML tokens
  var texcommand = "\\\\[a-zA-Z]+|\\\\\\s|";
  var ambigAMtoken = "\\b(?:oo|lim|ln|int|oint|del|grad|aleph|prod|prop|sinh|cosh|tanh|cos|sec|pi|tt|fr|sf|sube|supe|sub|sup|det|mod|gcd|lcm|min|max|vec|ddot|ul|chi|eta|nu|mu)(?![a-z])|";
  var englishAMtoken = "\\b(?:sum|ox|log|sin|tan|dim|hat|bar|dot)(?![a-z])|";
  var secondenglishAMtoken = "|\\bI\\b|\\bin\\b|\\btext\\b"; // took if and or not out
  var simpleAMtoken = "NN|ZZ|QQ|RR|CC|TT|AA|EE|sqrt|dx|dy|dz|dt|xx|vv|uu|nn|bb|cc|csc|cot|alpha|beta|delta|Delta|epsilon|gamma|Gamma|kappa|lambda|Lambda|omega|phi|Phi|Pi|psi|Psi|rho|sigma|Sigma|tau|theta|Theta|xi|Xi|zeta"; // uuu nnn?
  var letter = "[a-zA-HJ-Z](?=(?:[^a-zA-Z]|$|"+ambigAMtoken+englishAMtoken+simpleAMtoken+"))|";
  var token = letter+texcommand+"\\d+|[-()[\\]{}+=*&^_%\\\@/<>,\\|!:;'~]|\\.(?!(?:\x20|$))|"+ambigAMtoken+englishAMtoken+simpleAMtoken;
  var re = new RegExp("(^|\\s)((("+token+")\\s?)(("+token+secondenglishAMtoken+")\\s?)+)([,.?]?(?=\\s|$))","g");
  str = str.replace(re," `$2`$7");
  var arr = str.split(AMdelimiter1);
  var re1 = new RegExp("(^|\\s)([b-zB-HJ-Z+*<>]|"+texcommand+ambigAMtoken+simpleAMtoken+")(\\s|\\n|$)","g");
  var re2 = new RegExp("(^|\\s)([a-z]|"+texcommand+ambigAMtoken+simpleAMtoken+")([,.])","g"); // removed |\d+ for now
  for (i=0; i<arr.length; i++)   //single nonenglish tokens
    if (i%2==0) {
      arr[i] = arr[i].replace(re1," `$2`$3");
      arr[i] = arr[i].replace(re2," `$2`$3");
      arr[i] = arr[i].replace(/([{}[\]])/,"`$1`");
    }
  str = arr.join(AMdelimiter1);
  str = str.replace(/((^|\s)\([a-zA-Z]{2,}.*?)\)`/g,"$1`)");  //fix parentheses
  str = str.replace(/`(\((a\s|in\s))(.*?[a-zA-Z]{2,}\))/g,"$1`$3");  //fix parentheses
  str = str.replace(/\sin`/g,"` in");
  str = str.replace(/`(\(\w\)[,.]?(\s|\n|$))/g,"$1`");
  str = str.replace(/`([0-9.]+|e.g|i.e)`(\.?)/gi,"$1$2");
  str = str.replace(/`([0-9.]+:)`/g,"$1");
  return str;
}