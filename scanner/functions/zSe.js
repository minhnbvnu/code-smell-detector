function zSe(e,t,r,n){let i=u6e(t),a=Tl(i,0),l=Xc(a)==i.length&&i!=" ",s="",u=!1,c=!1,d=!1;Zo&&Zo.view==r&&Zo.scope==n&&(s=Zo.prefix+" ",Jae.indexOf(t.keyCode)<0&&(c=!0,Zo=null));let f=new Set,h=b=>{if(b){for(let v of b.run)if(!f.has(v)&&(f.add(v),v(r,t)))return b.stopPropagation&&(d=!0),!0;b.preventDefault&&(b.stopPropagation&&(d=!0),c=!0)}return!1},p=e[n],m,g;return p&&(h(p[s+fm(i,t,!l)])?u=!0:l&&(t.altKey||t.metaKey||t.ctrlKey)&&!(je.windows&&t.ctrlKey&&t.altKey)&&(m=ks[t.keyCode])&&m!=i?(h(p[s+fm(m,t,!0)])||t.shiftKey&&(g=vh[t.keyCode])!=i&&g!=m&&h(p[s+fm(g,t,!1)]))&&(u=!0):l&&t.shiftKey&&h(p[s+fm(i,t,!0)])&&(u=!0),!u&&h(p._any)&&(u=!0)),c&&(u=!0),u&&d&&t.stopPropagation(),u}