function K0e(e){let{state:t,isDisabled:r,validationState:n,label:i,overlayProps:a,loadingState:l,onLoadMore:s,onClose:u}=e,c=O.useRef(null),[d,f]=O.useState(!1),h=O.useRef(),p=O.useRef(),m=O.useRef(),g=O.useRef(),b=l==="loading"||l==="loadingMore",v=GR(t,b),y=ar($t(Jh),"@react-spectrum/combobox"),{inputProps:$,listBoxProps:x,labelProps:k}=eX({...e,keyboardDelegate:v,buttonRef:hc(p),popoverRef:m,listBoxRef:g,inputRef:h,name:void 0},t);S.useEffect(()=>{Tn(h.current)},[]),S.useEffect(()=>{!t.isOpen&&t.isFocused&&t.setFocused(!1)});let{dialogProps:C}=nX({"aria-labelledby":nr(k.id)},m);$.role="searchbox",$["aria-haspopup"]="listbox",delete $["aria-expanded"],delete $.onTouchEnd;let A=S.createElement(Ame,{preventFocus:!0,"aria-label":y.format("clear"),excludeFromTabOrder:!0,onPress:()=>{t.setInputValue(""),h.current.focus()},UNSAFE_className:z($t(fn),"spectrum-ClearButton"),isDisabled:r}),E=S.createElement(pd,{"aria-label":y.format("loading"),size:"S",isIndeterminate:!0,UNSAFE_className:z($t(fn),"spectrum-Search-circleLoader",z($t(hr),"spectrum-Textfield-circleLoader"))}),M=O.useRef(!1),D=()=>{M.current=!0},T=()=>{M.current=!1},B=O.useCallback(()=>{!h.current||document.activeElement!==h.current||!M.current||m.current.focus()},[h,m,M]),R=$.value,_=O.useRef(R);O.useEffect(()=>{l==="filtering"&&!d?(c.current===null&&(c.current=setTimeout(()=>{f(!0)},500)),R!==_.current&&(clearTimeout(c.current),c.current=setTimeout(()=>{f(!0)},500))):l!=="filtering"&&(f(!1),clearTimeout(c.current),c.current=null),_.current=R},[l,R,d]);let V=W=>{W.key==="Enter"&&t.selectionManager.focusedKey==null?m.current.focus():$.onKeyDown(W)};return S.createElement(jh,{restoreFocus:!0,contain:!0},S.createElement("div",{...$e(a,C),ref:m,className:z($t(Rn),"tray-dialog")},S.createElement(qc,{onDismiss:u}),S.createElement(Xh,{label:i,labelProps:k,inputProps:{...$,onKeyDown:V},inputRef:h,isDisabled:r,isLoading:d&&l==="filtering",loadingIndicator:l!=null&&E,validationState:n,labelAlign:"start",labelPosition:"top",wrapperChildren:(t.inputValue!==""||l==="filtering"||n!=null)&&!e.isReadOnly&&A,UNSAFE_className:z($t(fn),"spectrum-Search","spectrum-Textfield","spectrum-Search--loadable",{"spectrum-Search--invalid":n==="invalid"&&!r,"spectrum-Search--valid":n==="valid"&&!r},z($t(Rn),"tray-textfield",{"has-label":!!e.label})),inputClassName:z($t(Rn),"tray-textfield-input",z($t(fn),"spectrum-Search-input")),validationIconClassName:z($t(fn),"spectrum-Search-validationIcon")}),S.createElement(XR,{...x,domProps:{onTouchStart:D,onTouchEnd:T},disallowEmptySelection:!0,shouldSelectOnPressUp:!0,focusOnPointerEnter:!0,layout:v,state:t,shouldUseVirtualFocus:!0,renderEmptyState:()=>l!=="loading"&&S.createElement("span",{className:z($t(Rn),"no-results")},y.format("noResults")),UNSAFE_className:z($t(Rn),"tray-listbox"),ref:g,onScroll:B,onLoadMore:s,isLoading:b}),S.createElement(qc,{onDismiss:u})))}