function zM(t,e,r){var n=WM(t),i=new sr({compound:!0}).setGraph({root:n}).setDefaultNodeLabel(function(s){return t.node(s)});return vt(t.nodes(),function(s){var a=t.node(s),o=t.parent(s);(a.rank===e||a.minRank<=e&&e<=a.maxRank)&&(i.setNode(s),i.setParent(s,o||n),vt(t[r](s),function(l){var u=l.v===s?l.w:l.v,d=i.edge(u,s),f=Ze(d)?0:d.weight;i.setEdge(u,s,{weight:t.edge(l).weight+f})}),me(a,"minRank")&&i.setNode(s,{borderLeft:a.borderLeft[e],borderRight:a.borderRight[e]}))}),i}