function y5e(e,t){for(var r=/(\n+)([^\n]*)/g,i=function(){var l=e.indexOf(`
`);return l=l!==-1?l:e.length,r.lastIndex=l,xV(e.slice(0,l),t)}(),a=e[0]===`
`||e[0]===" ",n,s;s=r.exec(e);){var o=s[1],u=s[2];n=u[0]===" ",i+=o+(!a&&!n&&u!==""?`
`:"")+xV(u,t),a=n}return i}