function Wse(e){return t;function t(r){const n=r&&r.position&&r.position[e]||{};if(typeof n.line=="number"&&n.line>0&&typeof n.column=="number"&&n.column>0)return{line:n.line,column:n.column,offset:typeof n.offset=="number"&&n.offset>-1?n.offset:void 0}}}