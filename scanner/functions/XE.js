function XE(n,t,e=!1){return n=mi.checkMatrix(n),t=mi.checkMatrix(t),e?new _l(n).solve(t):n.isSquare()?new th(n).solve(t):new eh(n).solve(t)}