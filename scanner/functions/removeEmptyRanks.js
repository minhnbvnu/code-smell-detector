function removeEmptyRanks(g){var offset=_.min(_.map(g.nodes(),function(v){return g.node(v).rank}));var layers=[];_.forEach(g.nodes(),function(v){var rank=g.node(v).rank-offset;if(!layers[rank]){layers[rank]=[]}layers[rank].push(v)});var delta=0,nodeRankFactor=g.graph().nodeRankFactor;_.forEach(layers,function(vs,i){if(_.isUndefined(vs)&&i%nodeRankFactor!==0){--delta}else if(delta){_.forEach(vs,function(v){g.node(v).rank+=delta})}})}