function deindent(i,o){var s=i.start,u=i.end,C=o.getIndentString(),_=C.length,w=s-_;i.program.indentExclusions[w]||o.original.slice(w,s)!==C||o.remove(w,s);for(var P,B=new RegExp(C+"\\S","g"),z=o.original.slice(s,u);P=B.exec(z);){var U=s+P.index;i.program.indentExclusions[U]||o.remove(U,U+_)}}