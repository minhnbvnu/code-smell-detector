function ON(t){vt(t.nodes(),function(e){var r=t.node(e);r.dummy==="edge-proxy"&&(t.edge(r.e).labelRank=r.rank,t.removeNode(e))})}