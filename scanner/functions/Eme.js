function Eme(e,t){e=Ta(e,"button");let{isQuiet:r,isDisabled:n,validationState:i,isInvalid:a,children:l,autoFocus:s,isActive:u,focusRingClass:c,...d}=e,f=Da(t),{buttonProps:h,isPressed:p}=Po(e,f),{hoverProps:m,isHovered:g}=wr({isDisabled:n}),{styleProps:b}=_t(d);return S.createElement(Br,{focusRingClass:z(bn(Ge),"focus-ring",c),autoFocus:s},S.createElement("button",{...$e(h,m),ref:f,className:z(bn(Ge),"spectrum-FieldButton",{"spectrum-FieldButton--quiet":r,"is-active":u||p,"is-disabled":n,"spectrum-FieldButton--invalid":a||i==="invalid","is-hovered":g},b.className)},S.createElement(Ra,{slots:{icon:{size:"S",UNSAFE_className:z(bn(Ge),"spectrum-Icon")}}},l)))}