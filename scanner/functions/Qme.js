function Qme(e,t){let{children:r,isOpen:n,disableFocusManagement:i,container:a,onEnter:l,onEntering:s,onEntered:u,onExit:c,onExiting:d,onExited:f,nodeRef:h}=e,[p,m]=O.useState(!n),g=O.useCallback(()=>{m(!1),u&&u()},[u]),b=O.useCallback(()=>{m(!0),f&&f()},[f]);return n||!p?S.createElement(lme,{portalContainer:a,disableFocusManagement:i,isExiting:!n},S.createElement(qh,{ref:t,UNSAFE_style:{background:"transparent",isolation:"isolate"},isDisabled:!1},S.createElement(Lme,{in:n,appear:!0,onExit:c,onExiting:d,onExited:b,onEnter:l,onEntering:s,onEntered:g,nodeRef:h},r))):null}