function $M(t,e){var r={};vt(t,function(i,s){var a=r[i.v]={indegree:0,in:[],out:[],vs:[i.v],i:s};Ze(i.barycenter)||(a.barycenter=i.barycenter,a.weight=i.weight)}),vt(e.edges(),function(i){var s=r[i.v],a=r[i.w];!Ze(s)&&!Ze(a)&&(a.indegree++,s.out.push(r[i.w]))});var n=pi(r,function(i){return!i.indegree});return XM(n)}