function RD(t,e,n,i){var r=t.getModel(),o=t.getLayout(),a=t.hostTree.data;if(o&&!o.invisible&&o.isInView){var s,l=r.getModel("itemStyle"),u=function(t,e,n){var i=A({},e),r=n.designatedVisualItemStyle;return E(["color","colorAlpha","colorSaturation"],(function(n){r[n]=e[n];var o=t.get(n);r[n]=null,null!=o&&(i[n]=o)})),i}(l,e,i),h=a.ensureUniqueItemVisual(t.dataIndex,"style"),c=l.get("borderColor"),p=l.get("borderColorSaturation");null!=p&&(c=function(t,e){return null!=e?ni(e,null,null,t):null}(p,s=ND(u))),h.stroke=c;var d=t.viewChildren;if(d&&d.length){var f=function(t,e,n,i,r,o){if(!o||!o.length)return;var a=zD(e,"color")||null!=r.color&&"none"!==r.color&&(zD(e,"colorAlpha")||zD(e,"colorSaturation"));if(!a)return;var s=e.get("visualMin"),l=e.get("visualMax"),u=n.dataExtent.slice();null!=s&&s<u[0]&&(u[0]=s),null!=l&&l>u[1]&&(u[1]=l);var h=e.get("colorMappingBy"),c={type:a.name,dataExtent:u,visual:a.range};"color"!==c.type||"index"!==h&&"id"!==h?c.mappingMethod="linear":(c.mappingMethod="category",c.loop=!0);var p=new _D(c);return PD(p).drColorMappingBy=h,p}(0,r,o,0,u,d);E(d,(function(t,e){if(t.depth>=n.length||t===n[t.depth]){var o=function(t,e,n,i,r,o){var a=A({},e);if(r){var s=r.type,l="color"===s&&PD(r).drColorMappingBy,u="index"===l?i:"id"===l?o.mapIdToIndex(n.getId()):n.getValue(t.get("visualDimension"));a[s]=r.mapValueToVisual(u)}return a}(r,u,t,e,f,i);RD(t,o,n,i)}}))}else s=ND(u),h.fill=s}}