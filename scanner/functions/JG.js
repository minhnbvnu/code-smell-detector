function JG(t){var e=1/0,n=1/0,i=-1/0,r=-1/0,o=z(t,(function(t){var o=t.getBoundingRect(),a=t.getComputedTransform(),s=o.x+o.width/2+(a?a[4]:0),l=o.y+o.height/2+(a?a[5]:0);return e=Math.min(s,e),n=Math.min(l,n),i=Math.max(s,i),r=Math.max(l,r),[s,l]}));return z(o,(function(o,a){return{cp:o,z:$G(o[0],o[1],e,n,i,r),path:t[a]}})).sort((function(t,e){return t.z-e.z})).map((function(t){return t.path}))}