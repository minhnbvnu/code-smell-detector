function mye({cell:e}){let t=O.useRef(),{state:r,isTableDraggable:n}=Ei(),i=r.disabledKeys.has(e.parentKey),{gridCellProps:a}=iI({node:e,isVirtualized:!0},r,t);return S.createElement(Br,{focusRingClass:z(Ne(me),"focus-ring")},S.createElement("div",{...a,ref:t,className:z(Ne(me),"spectrum-Table-cell",{"is-disabled":i},z(Ne(wt),"react-spectrum-Table-cell","react-spectrum-Table-dragButtonCell"))},n&&!i&&S.createElement(dye,null)))}