function Eve(e){let{isInvalid:t,validationState:r,name:n,value:i,builtinValidation:a,validate:l,validationBehavior:s="aria"}=e;r&&(t||(t=r==="invalid"));let u=t?{isInvalid:!0,validationErrors:[],validationDetails:RK}:null,c=O.useMemo(()=>F_(Pve(l,i)),[l,i]);a!=null&&a.validationDetails.valid&&(a=null);let d=O.useContext(IK),f=O.useMemo(()=>n?Array.isArray(n)?n.flatMap(D=>Z6(d[D])):Z6(d[n]):[],[d,n]),[h,p]=O.useState(d),[m,g]=O.useState(!1);d!==h&&(p(d),g(!1));let b=O.useMemo(()=>F_(m?[]:f),[m,f]),v=O.useRef(Xu),[y,$]=O.useState(Xu),x=O.useRef(Xu),k=()=>{if(!C)return;A(!1);let D=c||a||v.current;Ny(D,x.current)||(x.current=D,$(D))},[C,A]=O.useState(!1);return O.useEffect(k),{realtimeValidation:u||b||c||a||Xu,displayValidation:s==="native"?u||b||y:u||b||c||a||y,updateValidation(D){s==="aria"&&!Ny(y,D)?$(D):v.current=D},resetValidation(){let D=Xu;Ny(D,x.current)||(x.current=D,$(D)),s==="native"&&A(!1),g(!0)},commitValidation(){s==="native"&&A(!0),g(!0)}}}