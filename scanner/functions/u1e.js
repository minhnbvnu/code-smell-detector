function u1e(e,t){let{variant:r="help",placement:n="bottom start",children:i,...a}=e,l=ar(zd(xJ),"@react-spectrum/contextualhelp"),s=r==="info"?S.createElement(ZR,null):S.createElement(s1e,null),u={content:{UNSAFE_className:zd(so)["react-spectrum-ContextualHelp-content"]},footer:{UNSAFE_className:zd(so)["react-spectrum-ContextualHelp-footer"]}},c=lh(a,l.format(r));return S.createElement(n1e,{...a,type:"popover",placement:n,hideArrow:!0},S.createElement($o,{...$e(a,c,{isDisabled:!1}),ref:t,UNSAFE_className:z(zd(so),"react-spectrum-ContextualHelp-button",a.UNSAFE_className),isQuiet:!0},s),S.createElement(T1,null,S.createElement(Ra,{slots:u},S.createElement(r1e,{UNSAFE_className:z(zd(so),"react-spectrum-ContextualHelp-dialog")},i))))}