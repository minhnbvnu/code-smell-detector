function dfsFAS(g){var fas=[],stack={},visited={};function dfs(v){if(_.has(visited,v)){return}visited[v]=true;stack[v]=true;_.forEach(g.outEdges(v),function(e){if(_.has(stack,e.w)){fas.push(e)}else{dfs(e.w)}});delete stack[v]}_.forEach(g.nodes(),dfs);return fas}