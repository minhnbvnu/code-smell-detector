function DL(t){return{createCover:function(e,n){return hL({toRectRange:function(e){var n=[e,[0,100]];return t&&n.reverse(),n},fromRectRange:function(e){return e[t]}},e,n,[[["w"],["e"]],[["n"],["s"]]][t])},getCreatingRange:function(e){var n=uL(e);return[Yk(n[0][t],n[1][t]),Xk(n[0][t],n[1][t])]},updateCoverShape:function(e,n,i,r){var o,a=aL(e,n);if(a!==Hk&&a.getLinearBrushOtherExtent)o=a.getLinearBrushOtherExtent(t);else{var s=e._zr;o=[0,[s.getWidth(),s.getHeight()][1-t]]}var l=[i,o];t&&l.reverse(),cL(e,n,l,r)},updateCommon:pL,contain:wL}}