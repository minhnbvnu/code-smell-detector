function ome(e,t){let r=c2("(prefers-color-scheme: dark)"),n=c2("(prefers-color-scheme: light)");return e.dark&&r?"dark":e.light&&n?"light":e.dark&&t==="dark"?"dark":e.light&&t==="light"||!e.dark||e.light?"light":"dark"}