function j8(){var t={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},e,r;function n(i){i.multi?(t.multi[i.kind].push(i),t.multi.fallback.push(i)):t[i.kind][i.tag]=t.fallback[i.tag]=i}for(e=0,r=arguments.length;e<r;e+=1)arguments[e].forEach(n);return t}