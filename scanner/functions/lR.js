function lR(e){let t="[a-z'][a-zA-Z0-9_']*",n="("+t+":"+t+"|"+t+")",o={keyword:"after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun if let not of orelse|10 query receive rem try when xor",literal:"false true"},s=e.COMMENT("%","$"),c={className:"number",begin:"\\b(\\d+(_\\d+)*#[a-fA-F0-9]+(_[a-fA-F0-9]+)*|\\d+(_\\d+)*(\\.\\d+(_\\d+)*)?([eE][-+]?\\d+)?)",relevance:0},u={begin:"fun\\s+"+t+"/\\d+"},d={begin:n+"\\(",end:"\\)",returnBegin:!0,relevance:0,contains:[{begin:n,relevance:0},{begin:"\\(",end:"\\)",endsWithParent:!0,returnEnd:!0,relevance:0}]},S={begin:/\{/,end:/\}/,relevance:0},b={begin:"\\b_([A-Z][A-Za-z0-9_]*)?",relevance:0},h={begin:"[A-Z][a-zA-Z0-9_]*",relevance:0},A={begin:"#"+e.UNDERSCORE_IDENT_RE,relevance:0,returnBegin:!0,contains:[{begin:"#"+e.UNDERSCORE_IDENT_RE,relevance:0},{begin:/\{/,end:/\}/,relevance:0}]},N={beginKeywords:"fun receive if try case",end:"end",keywords:o};N.contains=[s,u,e.inherit(e.APOS_STRING_MODE,{className:""}),N,d,e.QUOTE_STRING_MODE,c,S,b,h,A];let I=[s,u,N,d,e.QUOTE_STRING_MODE,c,S,b,h,A];d.contains[1].contains=I,S.contains=I,A.contains[1].contains=I;let w=["-module","-record","-undef","-export","-ifdef","-ifndef","-author","-copyright","-doc","-vsn","-import","-include","-include_lib","-compile","-define","-else","-endif","-file","-behaviour","-behavior","-spec"],y={className:"params",begin:"\\(",end:"\\)",contains:I};return{name:"Erlang",aliases:["erl"],keywords:o,illegal:"(</|\\*=|\\+=|-=|/\\*|\\*/|\\(\\*|\\*\\))",contains:[{className:"function",begin:"^"+t+"\\s*\\(",end:"->",returnBegin:!0,illegal:"\\(|#|//|/\\*|\\\\|:|;",contains:[y,e.inherit(e.TITLE_MODE,{begin:t})],starts:{end:";|\\.",keywords:o,contains:I}},s,{begin:"^-",end:"\\.",relevance:0,excludeEnd:!0,returnBegin:!0,keywords:{$pattern:"-"+e.IDENT_RE,keyword:w.map(B=>`${B}|1.5`).join(" ")},contains:[y]},c,e.QUOTE_STRING_MODE,A,b,h,S,{begin:/\.$/}]}}