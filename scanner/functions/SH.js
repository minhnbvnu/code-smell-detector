function SH(e){let{selectionManager:t,collection:r,disabledKeys:n,ref:i,keyboardDelegate:a}=e,l=hd({usage:"search",sensitivity:"base"}),s=t.disabledBehavior,u=O.useMemo(()=>a||new LR(r,s==="selection"?new Set:n,i,l),[a,r,n,i,l,s]),{collectionProps:c}=NR({...e,ref:i,selectionManager:t,keyboardDelegate:u});return{listProps:c}}