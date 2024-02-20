function Xye(e,t){var r=t.namespace;if(t.useColors){var n=t.color,i="\x1B[3"+(n<8?n:"8;5;"+n),a="  ".concat(i,";1m").concat(r," \x1B[0m");e[0]=a+e[0].split(`
`).join(`
`+a)}else e[0]=r+" "+e[0]}