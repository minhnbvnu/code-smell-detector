function yR(e){let t=e.regex,n={$pattern:/[\w.\/]+/,built_in:["action","bindattr","collection","component","concat","debugger","each","each-in","get","hash","if","in","input","link-to","loc","log","lookup","mut","outlet","partial","query-params","render","template","textarea","unbound","unless","view","with","yield"]},o={$pattern:/[\w.\/]+/,literal:["true","false","undefined","null"]},s=/""|"[^"]+"/,c=/''|'[^']+'/,u=/\[\]|\[[^\]]+\]/,d=/[^\s!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+/,S=/(\.|\/)/,b=t.either(s,c,u,d),h=t.concat(t.optional(/\.|\.\/|\//),b,t.anyNumberOfTimes(t.concat(S,b))),A=t.concat("(",u,"|",d,")(?==)"),N={begin:h},I=e.inherit(N,{keywords:o}),w={begin:/\(/,end:/\)/},y={className:"attr",begin:A,relevance:0,starts:{begin:/=/,end:/=/,starts:{contains:[e.NUMBER_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,I,w]}}},B={begin:/as\s+\|/,keywords:{keyword:"as"},end:/\|/,contains:[{begin:/\w+/}]},Y={contains:[e.NUMBER_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,B,y,I,w],returnEnd:!0},z=e.inherit(N,{className:"name",keywords:n,starts:e.inherit(Y,{end:/\)/})});w.contains=[z];let V=e.inherit(N,{keywords:n,className:"name",starts:e.inherit(Y,{end:/\}\}/})}),X=e.inherit(N,{keywords:n,className:"name"}),ee=e.inherit(N,{className:"name",keywords:n,starts:e.inherit(Y,{end:/\}\}/})});return{name:"Handlebars",aliases:["hbs","html.hbs","html.handlebars","htmlbars"],case_insensitive:!0,subLanguage:"xml",contains:[{begin:/\\\{\{/,skip:!0},{begin:/\\\\(?=\{\{)/,skip:!0},e.COMMENT(/\{\{!--/,/--\}\}/),e.COMMENT(/\{\{!/,/\}\}/),{className:"template-tag",begin:/\{\{\{\{(?!\/)/,end:/\}\}\}\}/,contains:[V],starts:{end:/\{\{\{\{\//,returnEnd:!0,subLanguage:"xml"}},{className:"template-tag",begin:/\{\{\{\{\//,end:/\}\}\}\}/,contains:[X]},{className:"template-tag",begin:/\{\{#/,end:/\}\}/,contains:[V]},{className:"template-tag",begin:/\{\{(?=else\}\})/,end:/\}\}/,keywords:"else"},{className:"template-tag",begin:/\{\{(?=else if)/,end:/\}\}/,keywords:"else if"},{className:"template-tag",begin:/\{\{\//,end:/\}\}/,contains:[X]},{className:"template-variable",begin:/\{\{\{/,end:/\}\}\}/,contains:[ee]},{className:"template-variable",begin:/\{\{/,end:/\}\}/,contains:[ee]}]}}