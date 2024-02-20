function nCe(e){if(!e)return"";if(!/\r/.test(e))return e;if(!/\n/.test(e))return GQ(e);e=e.replace(/\r+\n/gm,`
`);var t=e.lastIndexOf(`
`);return VI(e.slice(0,t))+`
`+GQ(e.slice(t+1))}