function addBorderSegments(g){function dfs(v){var children=g.children(v),node=g.node(v);if(children.length){_.forEach(children,dfs)}if(_.has(node,"minRank")){node.borderLeft=[];node.borderRight=[];for(var rank=node.minRank,maxRank=node.maxRank+1;rank<maxRank;++rank){addBorderNode(g,"borderLeft","_bl",v,node,rank);addBorderNode(g,"borderRight","_br",v,node,rank)}}}_.forEach(g.children(),dfs)}