function buildTrans(def,node){if(def.duration)node.duration=def.duration;if(def.ease)node.ease=d3.ease(def.ease);if(def.delay){var items=node.items,group=node.group,n=items.length,i;for(i=0;i<n;++i)def.delay.call(this,items[i],group)}}