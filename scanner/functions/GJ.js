function GJ(t,e){const n=AJ(t),i=t.type===XY,r=t.from&&t.from.facet,a=t.overlap;let o=t.layout||n===tX||n===QW,s,u,l,f,c,h,d;const p=n===ZW||o||r;const m=PJ(t.from,i,e);u=e.add(bH({key:m.key||(t.key?PX(t.key):undefined),pulse:m.pulse,clean:!i}));const y=qX(u);u=l=e.add(xH({pulse:y}));u=e.add(FH({markdef:EJ(t),interactive:DJ(t.interactive,e),clip:kJ(t.clip,e),context:{$context:true},groups:e.lookup(),parent:e.signals.parent?e.signalRef("parent"):null,index:e.markpath(),pulse:qX(u)}));const v=qX(u);u=f=e.add(wH(FX(t.encode,t.type,n,t.style,e,{mod:false,pulse:v})));u.params.parent=e.encode();if(t.transform){t.transform.forEach((t=>{const n=CJ(t,e),i=n.metadata;if(i.generates||i.changes){(0,g.vU)("Mark transforms should not generate new data.")}if(!i.nomod)f.params.mod=true;n.params.pulse=qX(u);e.add(u=n)}))}if(t.sort){u=e.add(PH({sort:e.compareRef(t.sort),pulse:qX(u)}))}const x=qX(u);if(r||o){o=e.add(LH({layout:e.objectProperty(t.layout),legends:e.legends,mark:v,pulse:x}));h=qX(o)}const _=e.add(vH({mark:v,pulse:h||x}));d=qX(_);if(i){if(p){s=e.operators;s.pop();if(o)s.pop()}e.pushState(x,h||d,y);r?YJ(t,e,m):p?JJ(t,e,m):e.parse(t);e.popState();if(p){if(o)s.push(o);s.push(_)}}if(a){d=KJ(a,d,e)}const b=e.add($H({pulse:d})),w=e.add(qH({pulse:qX(b)},undefined,e.parent()));if(t.name!=null){c=t.name;e.addData(c,new jJ(e,l,b,w));if(t.on)t.on.forEach((t=>{if(t.insert||t.remove||t.toggle){(0,g.vU)("Marks only support modify triggers.")}VJ(t,e,c)}))}}