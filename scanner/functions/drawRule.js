function drawRule(g,scene,bounds){if(!scene.items.length)return;var items=scene.items,o,stroke,opac,lc,lw,x1,y1,x2,y2;for(var i=0,len=items.length;i<len;++i){o=items[i];if(bounds&&!bounds.intersects(o.bounds))continue;x1=o.x||0;y1=o.y||0;x2=o.x2!=null?o.x2:x1;y2=o.y2!=null?o.y2:y1;opac=o.opacity==null?1:o.opacity;if(opac==0)continue;if(stroke=o.stroke){lw=(lw=o.strokeWidth)!=null?lw:vg.config.render.lineWidth;if(lw>0){g.globalAlpha=opac*(o.strokeOpacity==null?1:o.strokeOpacity);g.strokeStyle=color(g,o,stroke);g.lineWidth=lw;g.lineCap=(lc=o.strokeCap)!=null?lc:vg.config.render.lineCap;g.vgLineDash(o.strokeDash||null);g.vgLineDashOffset(o.strokeDashOffset||0);g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()}}}}