function Fbe(e,t){e=En(e);let{isEmphasized:r=!1,isDisabled:n=!1,autoFocus:i,children:a,...l}=e,{styleProps:s}=_t(l),{hoverProps:u,isHovered:c}=wr({isDisabled:n}),d=O.useRef(null),f=Da(t,d),h=BR(e),{inputProps:p}=Abe(e,h,d);return S.createElement("label",{...s,...u,ref:f,className:z(jd(jn),"spectrum-ToggleSwitch",{"spectrum-ToggleSwitch--quiet":!r,"is-disabled":n,"is-hovered":c},s.className)},S.createElement(Br,{focusRingClass:z(jd(jn),"focus-ring"),autoFocus:i},S.createElement("input",{...p,ref:d,className:z(jd(jn),"spectrum-ToggleSwitch-input")})),S.createElement("span",{className:z(jd(jn),"spectrum-ToggleSwitch-switch")}),a&&S.createElement("span",{className:z(jd(jn),"spectrum-ToggleSwitch-label")},a))}