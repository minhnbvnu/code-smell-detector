function L2(t,e,r,n,i,s,a,o,l,u){var d=r2(),f=d.invert,p=d.domain,g=u(".%L"),b=u(":%S"),k=u("%I:%M"),T=u("%I %p"),L=u("%a %d"),E=u("%b %d"),I=u("%B"),V=u("%Y");function H(G){return(l(G)<G?g:o(G)<G?b:a(G)<G?k:s(G)<G?T:n(G)<G?i(G)<G?L:E:r(G)<G?I:V)(G)}return d.invert=function(G){return new Date(f(G))},d.domain=function(G){return arguments.length?p(Array.from(G,uk)):p().map(ck)},d.ticks=function(G){var Y=p();return t(Y[0],Y[Y.length-1],G==null?10:G)},d.tickFormat=function(G,Y){return Y==null?H:u(Y)},d.nice=function(G){var Y=p();return(!G||typeof G.range!="function")&&(G=e(Y[0],Y[Y.length-1],G==null?10:G)),G?p(j6(Y,G)):d},d.copy=function(){return e2(d,L2(t,e,r,n,i,s,a,o,l,u))},d}