function HL(t,e){t.eachSeriesByType("sankey",(function(t){var n=t.get("nodeWidth"),i=t.get("nodeGap"),r=function(t,e){return Cp(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()})}(t,e);t.layoutInfo=r;var o=r.width,a=r.height,s=t.getGraph(),l=s.nodes,u=s.edges;!function(t){E(t,(function(t){var e=QL(t.outEdges,JL),n=QL(t.inEdges,JL),i=t.getValue()||0,r=Math.max(e,n,i);t.setLayout({value:r},!0)}))}(l),function(t,e,n,i,r,o,a,s,l){(function(t,e,n,i,r,o,a){for(var s=[],l=[],u=[],h=[],c=0,p=0;p<e.length;p++)s[p]=1;for(p=0;p<t.length;p++)l[p]=t[p].inEdges.length,0===l[p]&&u.push(t[p]);var d=-1;for(;u.length;){for(var f=0;f<u.length;f++){var g=u[f],y=g.hostGraph.data.getRawDataItem(g.dataIndex),v=null!=y.depth&&y.depth>=0;v&&y.depth>d&&(d=y.depth),g.setLayout({depth:v?y.depth:c},!0),"vertical"===o?g.setLayout({dy:n},!0):g.setLayout({dx:n},!0);for(var m=0;m<g.outEdges.length;m++){var x=g.outEdges[m];s[e.indexOf(x)]=0;var _=x.node2;0==--l[t.indexOf(_)]&&h.indexOf(_)<0&&h.push(_)}}++c,u=h,h=[]}for(p=0;p<s.length;p++)if(1===s[p])throw new Error("Sankey is a DAG, the original data has cycle!");var b=d>c-1?d:c-1;a&&"left"!==a&&function(t,e,n,i){if("right"===e){for(var r=[],o=t,a=0;o.length;){for(var s=0;s<o.length;s++){var l=o[s];l.setLayout({skNodeHeight:a},!0);for(var u=0;u<l.inEdges.length;u++){var h=l.inEdges[u];r.indexOf(h.node1)<0&&r.push(h.node1)}}o=r,r=[],++a}E(t,(function(t){YL(t)||t.setLayout({depth:Math.max(0,i-t.getLayout().skNodeHeight)},!0)}))}else"justify"===e&&function(t,e){E(t,(function(t){YL(t)||t.outEdges.length||t.setLayout({depth:e},!0)}))}(t,i)}(t,a,0,b);var w="vertical"===o?(r-n)/b:(i-n)/b;!function(t,e,n){E(t,(function(t){var i=t.getLayout().depth*e;"vertical"===n?t.setLayout({y:i},!0):t.setLayout({x:i},!0)}))}(t,w,o)})(t,e,n,r,o,s,l),function(t,e,n,i,r,o,a){var s=function(t,e){var n=[],i="vertical"===e?"y":"x",r=Go(t,(function(t){return t.getLayout()[i]}));return r.keys.sort((function(t,e){return t-e})),E(r.keys,(function(t){n.push(r.buckets.get(t))})),n}(t,a);(function(t,e,n,i,r,o){var a=1/0;E(t,(function(t){var e=t.length,s=0;E(t,(function(t){s+=t.getLayout().value}));var l="vertical"===o?(i-(e-1)*r)/s:(n-(e-1)*r)/s;l<a&&(a=l)})),E(t,(function(t){E(t,(function(t,e){var n=t.getLayout().value*a;"vertical"===o?(t.setLayout({x:e},!0),t.setLayout({dx:n},!0)):(t.setLayout({y:e},!0),t.setLayout({dy:n},!0))}))})),E(e,(function(t){var e=+t.getValue()*a;t.setLayout({dy:e},!0)}))})(s,e,n,i,r,a),XL(s,r,n,i,a);for(var l=1;o>0;o--)UL(s,l*=.99,a),XL(s,r,n,i,a),tP(s,l,a),XL(s,r,n,i,a)}(t,e,o,r,i,a,s),function(t,e){var n="vertical"===e?"x":"y";E(t,(function(t){t.outEdges.sort((function(t,e){return t.node2.getLayout()[n]-e.node2.getLayout()[n]})),t.inEdges.sort((function(t,e){return t.node1.getLayout()[n]-e.node1.getLayout()[n]}))})),E(t,(function(t){var e=0,n=0;E(t.outEdges,(function(t){t.setLayout({sy:e},!0),e+=t.getLayout().dy})),E(t.inEdges,(function(t){t.setLayout({ty:n},!0),n+=t.getLayout().dy}))}))}(t,s)}(l,u,n,i,o,a,0!==B(l,(function(t){return 0===t.getLayout().value})).length?0:t.get("layoutIterations"),t.get("orient"),t.get("nodeAlign"))}))}