function y3(t,e,r){const n=e.width,i=e.height,s=[{x:0,y:0},{x:n,y:0},{x:n,y:-i},{x:0,y:-i},{x:0,y:0},{x:-8,y:0},{x:n+8,y:0},{x:n+8,y:-i},{x:-8,y:-i},{x:-8,y:0}],a=ki(t,n,i,s);return r.intersect=function(o){return jn(r,s,o)},a}