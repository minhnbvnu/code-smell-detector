function F_(t,e){return z(B((t=function(t){if(!t.UTF8Encoding)return t;var e=t,n=e.UTF8Scale;return null==n&&(n=1024),E(e.features,(function(t){var e=t.geometry,i=e.encodeOffsets,r=e.coordinates;if(i)switch(e.type){case"LineString":e.coordinates=B_(r,i,n);break;case"Polygon":case"MultiLineString":V_(r,i,n);break;case"MultiPolygon":E(r,(function(t,e){return V_(t,i[e],n)}))}})),e.UTF8Encoding=!1,e}(t)).features,(function(t){return t.geometry&&t.properties&&t.geometry.coordinates.length>0})),(function(t){var n=t.properties,i=t.geometry,r=[];switch(i.type){case"Polygon":var o=i.coordinates;r.push(new R_(o[0],o.slice(1)));break;case"MultiPolygon":E(i.coordinates,(function(t){t[0]&&r.push(new R_(t[0],t.slice(1)))}));break;case"LineString":r.push(new N_([i.coordinates]));break;case"MultiLineString":r.push(new N_(i.coordinates))}var a=new E_(n[e||"name"],r,n.cp);return a.properties=n,a}))}