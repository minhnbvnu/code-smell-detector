function Lbe(e){let{selectionMode:t="none",showSelectionCheckboxes:r,showDragButtons:n,UNSTABLE_expandedKeys:i,UNSTABLE_defaultExpandedKeys:a,UNSTABLE_onExpandedChange:l,children:s}=e;if(!Kc())throw new Error("Feature flag for table nested rows must be enabled to use useTreeGridState.");let[u,c]=ca(i?q_(i):void 0,a?q_(a):new Set,l),d=O.useMemo(()=>({showSelectionCheckboxes:r&&t!=="none",showDragButtons:n,selectionMode:t,columns:[]}),[s,r,t,n]),f=O.useMemo(()=>new YW,[]),h=O.useMemo(()=>f.build({children:s},d),[f,s,d]),p=O.useMemo(()=>Vbe(h,{showSelectionCheckboxes:r,showDragButtons:n,expandedKeys:u}),[h,r,n,u]),m=v=>{c(Qbe(u,v,p))},g=O.useMemo(()=>new tne(p.tableNodes,null,d),[d,p.tableNodes]);return{...rne({...e,collection:g}),keyMap:p.keyMap,userColumnCount:p.userColumnCount,expandedKeys:u,toggleKey:m}}