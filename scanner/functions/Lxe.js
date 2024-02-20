function Lxe(e){var t=e._originalScriptCode[e._originalScriptCode.length-1],r=t.lineNumber.toString().length,n=2,i=3,a=n+r+i+e._originalColumnNumber;return e._originalScriptCode.reduce(function(l,s){var u=s.highlight?">":" ",c=s.lineNumber.toString().length===r?"".concat(s.lineNumber):" ".concat(s.lineNumber),d=s.highlight?`
`+" ".repeat(a)+"^":"";return l+`
`+u+" "+c+" | "+s.content+d},"")}