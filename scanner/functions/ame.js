function ame(e,t){let{triggerRef:r,popoverRef:n,isNonModal:i,isKeyboardDismissDisabled:a,shouldCloseOnInteractOutside:l,...s}=e,{overlayProps:u,underlayProps:c}=WU({isOpen:t.isOpen,onClose:t.close,shouldCloseOnBlur:!0,isDismissable:!i,isKeyboardDismissDisabled:a,shouldCloseOnInteractOutside:l},n),{overlayProps:d,arrowProps:f,placement:h}=jU({...s,targetRef:r,overlayRef:n,isOpen:t.isOpen,onClose:i?t.close:null});return ZU({isDisabled:i||!t.isOpen}),St(()=>{if(t.isOpen&&!i&&n.current)return IR([n.current])},[i,t.isOpen,n]),{popoverProps:$e(u,d),arrowProps:f,underlayProps:c,placement:h}}