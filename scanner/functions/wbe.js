function wbe(e,t){e=En(e);let{isDisabled:r,children:n,classes:i,style:a,labelPosition:l="top",getValueLabel:s,showValueLabel:u=!!e.label,formatOptions:c,minValue:d=0,maxValue:f=100,...h}=e,{styleProps:p}=_t(h);Math.abs(Math.sign(d)-Math.sign(f))===2&&(c!=null?"signDisplay"in c||(c={...c,signDisplay:"exceptZero"}):c={signDisplay:"exceptZero"});const g=Qg(c),b=Obe({...e,numberFormatter:g,minValue:d,maxValue:f});let v=O.useRef(),{groupProps:y,trackProps:$,labelProps:x,outputProps:k}=xbe(e,b,v),C=O.useRef(),A=Da(t,C),E="",M;if(typeof s=="function")switch(E=s(b.values),b.values.length){case 1:M=Math.max(s([d]).length,s([f]).length);break;case 2:M=Math.max(s([d,d]).length,s([d,f]).length,s([f,d]).length,s([f,f]).length);break;default:throw new Error("Only sliders with 1 or 2 handles are supported!")}else switch(M=Math.max([...g.format(d)].length,[...g.format(f)].length),b.values.length){case 1:E=b.getThumbValueLabel(0);break;case 2:E=`${b.getThumbValueLabel(0)} – ${b.getThumbValueLabel(1)}`,M=3+2*Math.max(M,[...g.format(d)].length,[...g.format(f)].length);break;default:throw new Error("Only sliders with 1 or 2 handles are supported!")}let D=S.createElement("label",{className:z(Gi(Ze),"spectrum-Slider-label"),...x},e.label),T=S.createElement("output",{...k,className:z(Gi(Ze),"spectrum-Slider-value"),style:M&&{width:`${M}ch`,minWidth:`${M}ch`}},E);return S.createElement("div",{ref:A,className:z(Gi(Ze),"spectrum-Slider",{"spectrum-Slider--positionTop":l==="top","spectrum-Slider--positionSide":l==="side","is-disabled":r},i,p.className),style:{...a,...p.style},...y},e.label&&S.createElement("div",{className:z(Gi(Ze),"spectrum-Slider-labelContainer"),role:"presentation"},e.label&&D,e.contextualHelp&&S.createElement(Ra,{slots:{actionButton:{UNSAFE_className:z(Gi(Ze),"spectrum-Slider-contextualHelp")}}},e.contextualHelp),l==="top"&&u&&T),S.createElement("div",{className:z(Gi(Ze),"spectrum-Slider-controls"),ref:v,...$,role:"presentation"},n({trackRef:v,inputRef:C,state:b})),l==="side"&&S.createElement("div",{className:z(Gi(Ze),"spectrum-Slider-valueLabelContainer"),role:"presentation"},u&&T))}