function sh(t,e){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)||!0===i)if(e[r]&&e[r].constructor===Object)void 0===t[r]&&(t[r]={}),t[r].constructor===Object?sh(t[r],e[r],i):rh(t,e,r,n);else if(Array.isArray(e[r])){t[r]=[];for(var o=0;o<e[r].length;o++)t[r].push(e[r][o])}else rh(t,e,r,n);return t}