function mB(n,t,e,i,r){if(r=gB(t,r,e,i),Mu&&(r=Mu(r,e.target,e.kind,t)),e.kind=="attribute")n._valueToNodeAttribute(t,r,e.target);else{let o=e.target;t.__isPropertyEffectsClient&&t.__dataHasAccessor&&t.__dataHasAccessor[o]?(!t[Se.READ_ONLY]||!t[Se.READ_ONLY][o])&&t._setPendingProperty(o,r)&&n._enqueueClient(t):n._setUnmanagedPropertyToNode(t,o,r)}}