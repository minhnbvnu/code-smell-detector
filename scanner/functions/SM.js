function SM(t){var e=Mo(ir(t.nodes(),function(r){return t.node(r).rank}));vt(t.nodes(),function(r){var n=t.node(r);me(n,"rank")&&(n.rank-=e)})}