function kV(t,e,n){var i,r,o=[];t.eachComponent({mainType:"brush"},(function(t){n&&"takeGlobalCursor"===n.type&&t.setBrushOption("brush"===n.key?n.brushOption:{brushType:!1})})),AV(t),t.eachComponent({mainType:"brush"},(function(e,n){var a={brushId:e.id,brushIndex:n,brushName:e.name,areas:T(e.areas),selected:[]};o.push(a);var s=e.option,l=s.brushLink,u=[],h=[],c=[],p=!1;n||(i=s.throttleType,r=s.throttleDelay);var d=z(e.areas,(function(t){var e=OV[t.brushType],n=k({boundingRect:e?e(t):void 0},t);return n.selectors=function(t){var e=t.brushType,n={point:function(i){return SV[e].point(i,n,t)},rect:function(i){return SV[e].rect(i,n,t)}};return n}(n),n})),f=bV(e.option,TV,(function(t){t.mappingMethod="fixed"}));function g(t){return"all"===l||!!u[t]}function y(t){return!!t.length}Y(l)&&E(l,(function(t){u[t]=1})),t.eachSeries((function(n,i){var r=c[i]=[];"parallel"===n.subType?function(t,e){var n=t.coordinateSystem;p=p||n.hasAxisBrushed(),g(e)&&n.eachActiveState(t.getData(),(function(t,e){"active"===t&&(h[e]=1)}))}(n,i):function(n,i,r){if(!n.brushSelector||function(t,e){var n=t.option.seriesIndex;return null!=n&&"all"!==n&&(Y(n)?P(n,e)<0:e!==n)}(e,i))return;if(E(d,(function(i){e.brushTargetManager.controlSeries(i,n,t)&&r.push(i),p=p||y(r)})),g(i)&&y(r)){var o=n.getData();o.each((function(t){PV(n,r,o,t)&&(h[t]=1)}))}}(n,i,r)})),t.eachSeries((function(t,e){var n={seriesId:t.id,seriesIndex:e,seriesName:t.name,dataIndex:[]};a.selected.push(n);var i=c[e],r=t.getData(),o=g(e)?function(t){return h[t]?(n.dataIndex.push(r.getRawIndex(t)),"inBrush"):"outOfBrush"}:function(e){return PV(t,i,r,e)?(n.dataIndex.push(r.getRawIndex(e)),"inBrush"):"outOfBrush"};(g(e)?p:y(i))&&function(t,e,n,i,r,o){var a,s={};function l(t){return Iy(n,a,t)}function u(t,e){Cy(n,a,t,e)}function h(t,h){a=null==o?t:h;var c=n.getRawDataItem(a);if(!c||!1!==c.visualMap)for(var p=i.call(r,t),d=e[p],f=s[p],g=0,y=f.length;g<y;g++){var v=f[g];d[v]&&d[v].applyVisual(t,l,u)}}E(t,(function(t){var n=_D.prepareVisualTypes(e[t]);s[t]=n})),null==o?n.each(h):n.each([o],h)}(TV,f,r,o)}))})),function(t,e,n,i,r){if(!r)return;var o=t.getZr();if(o[DV])return;o[CV]||(o[CV]=LV);var a=Fg(o,CV,n,e);a(t,i)}(e,i,r,o,n)}