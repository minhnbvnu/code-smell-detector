function oye(e){var t,r,n,i,a;let{column:l}=e,s=O.useRef(null),u=O.useRef(null),c=O.useRef(null),{state:d,layout:f,onResizeStart:h,onResize:p,onResizeEnd:m,headerRowHovered:g,setIsInResizeMode:b,isEmpty:v,isInResizeMode:y,headerMenuOpen:$,setHeaderMenuOpen:x}=Ei(),k=ar(Ne(gd),"@react-spectrum/table"),{pressProps:C,isPressed:A}=zi({isDisabled:v}),{columnHeaderProps:E}=J1({node:l,isVirtualized:!0},d,s),{hoverProps:M,isHovered:D}=wr({...e,isDisabled:v||$});const T=[E,C,M];let B=l.props,{isFocusVisible:R,focusProps:_}=Uc();const V=Q=>{switch(Q){case"sort-asc":d.sort(l.key,"ascending");break;case"sort-desc":d.sort(l.key,"descending");break;case"resize":f.startResize(l.key),b(!0),d.setKeyboardNavigationDisabled(!0);break}};let W=(t=l.props)===null||t===void 0?void 0:t.allowsSorting,Z=O.useMemo(()=>[W?{label:k.format("sortAscending"),id:"sort-asc"}:void 0,W?{label:k.format("sortDescending"),id:"sort-desc"}:void 0,{label:k.format("resizeColumn"),id:"resize"}],[W]),K=f.resizingColumn,q=!v&&(g&&ms()!=="keyboard"||K!=null),F="start",j="start";return B.align==="center"||l.colspan>1?F="center":B.align==="end"&&(F="end",j="end"),S.createElement(Br,{focusRingClass:z(Ne(me),"focus-ring")},S.createElement("div",{...$e(...T),ref:s,className:z(Ne(me),"spectrum-Table-headCell",{"is-active":A,"is-resizable":B.allowsResizing,"is-sortable":B.allowsSorting,"is-sorted-desc":((r=d.sortDescriptor)===null||r===void 0?void 0:r.column)===l.key&&((n=d.sortDescriptor)===null||n===void 0?void 0:n.direction)==="descending","is-sorted-asc":((i=d.sortDescriptor)===null||i===void 0?void 0:i.column)===l.key&&((a=d.sortDescriptor)===null||a===void 0?void 0:a.direction)==="ascending","is-hovered":D,"focus-ring":R,"spectrum-Table-cell--hideHeader":B.hideHeader},z(Ne(wt),"react-spectrum-Table-cell",{"react-spectrum-Table-cell--alignCenter":F==="center","react-spectrum-Table-cell--alignEnd":F==="end"}))},S.createElement(Wge,{onOpenChange:x,align:j},S.createElement(lye,{alignment:F,ref:u,focusProps:_},B.allowsSorting&&S.createElement(yv,{UNSAFE_className:z(Ne(me),"spectrum-Table-sortedIcon")}),B.hideHeader?S.createElement(md,null,l.rendered):S.createElement("div",{className:z(Ne(me),"spectrum-Table-headerCellText")},l.rendered),B.allowsResizing&&S.createElement(N1,{UNSAFE_className:z(Ne(me),"spectrum-Table-menuChevron")})),S.createElement(Hge,{onAction:V,minWidth:"size-2000",items:Z},Q=>S.createElement(C1,null,Q.label))),S.createElement(Xbe,{ref:c,column:l,showResizer:q,onResizeStart:h,onResize:p,onResizeEnd:m,triggerRef:Vg(u)}),S.createElement("div",{"aria-hidden":!0,className:z(Ne(me),"spectrum-Table-colResizeIndicator",{"spectrum-Table-colResizeIndicator--visible":K!=null,"spectrum-Table-colResizeIndicator--resizing":K===l.key})},S.createElement("div",{className:z(Ne(me),"spectrum-Table-colResizeNubbin",{"spectrum-Table-colResizeNubbin--visible":y&&K===l.key})},S.createElement(Kbe,null)))))}