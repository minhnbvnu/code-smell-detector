function R3e(e,t){var r,i,a=gw,n=!1,s=!1,o=t,u=0,l=!1,p,c;if(c=e.input.charCodeAt(e.position),c===124)i=!1;else if(c===62)i=!0;else return!1;for(e.kind="scalar",e.result="";c!==0;)if(c=e.input.charCodeAt(++e.position),c===43||c===45)gw===a?a=c===43?qM:C3e:It(e,"repeat of a chomping mode identifier");else if((p=P3e(c))>=0)p===0?It(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):s?It(e,"repeat of an indentation width identifier"):(o=t+p-1,s=!0);else break;if(wc(c)){do c=e.input.charCodeAt(++e.position);while(wc(c));if(c===35)do c=e.input.charCodeAt(++e.position);while(!jo(c)&&c!==0)}for(;c!==0;){for(vw(e),e.lineIndent=0,c=e.input.charCodeAt(e.position);(!s||e.lineIndent<o)&&c===32;)e.lineIndent++,c=e.input.charCodeAt(++e.position);if(!s&&e.lineIndent>o&&(o=e.lineIndent),jo(c)){u++;continue}if(e.lineIndent<o){a===qM?e.result+=qu.repeat(`
`,n?1+u:u):a===gw&&n&&(e.result+=`
`);break}for(i?wc(c)?(l=!0,e.result+=qu.repeat(`
`,n?1+u:u)):l?(l=!1,e.result+=qu.repeat(`
`,u+1)):u===0?n&&(e.result+=" "):e.result+=qu.repeat(`
`,u):e.result+=qu.repeat(`
`,n?1+u:u),n=!0,s=!0,u=0,r=e.position;!jo(c)&&c!==0;)c=e.input.charCodeAt(++e.position);Wl(e,r,e.position,!1)}return!0}