function IN(t){var e=0;vt(t.nodes(),function(r){var n=t.node(r);n.borderTop&&(n.minRank=t.node(n.borderTop).rank,n.maxRank=t.node(n.borderBottom).rank,e=Cs(e,n.maxRank))}),t.graph().maxRank=e}