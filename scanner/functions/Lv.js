function Lv(e,r,t,a){var n=[],i=[],s=za(e["!ref"]),f="",l,o="",c=[],u=0,h=0,d=e["!rows"];var v=Array.isArray(e);var p={r:o},m,b=-1;for(h=s.s.c;h<=s.e.c;++h)c[h]=Ia(h);for(u=s.s.r;u<=s.e.r;++u){i=[];o=Ca(u);for(h=s.s.c;h<=s.e.c;++h){l=c[h]+o;var g=v?(e[u]||[])[h]:e[l];if(g===undefined)continue;if((f=Dv(g,l,e,r,t,a))!=null)i.push(f)}if(i.length>0||d&&d[u]){p={r:o};if(d&&d[u]){m=d[u];if(m.hidden)p.hidden=1;b=-1;if(m.hpx)b=Go(m.hpx);else if(m.hpt)b=m.hpt;if(b>-1){p.ht=b;p.customHeight=1}if(m.level){p.outlineLevel=m.level}}n[n.length]=xt("row",i.join(""),p)}}if(d)for(;u<d.length;++u){if(d&&d[u]){p={r:u+1};m=d[u];if(m.hidden)p.hidden=1;b=-1;if(m.hpx)b=Go(m.hpx);else if(m.hpt)b=m.hpt;if(b>-1){p.ht=b;p.customHeight=1}if(m.level){p.outlineLevel=m.level}n[n.length]=xt("row","",p)}}return n.join("")}