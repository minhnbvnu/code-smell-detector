function Qfe(e,t,r,n){var i;if(t===void 0&&(t=[]),r===void 0&&(r=null),n===void 0&&(n=null),e==null){var a;if((a=r)!=null&&a.errors)e=r.matches;else return null}let l=e,s=(i=r)==null?void 0:i.errors;if(s!=null){let d=l.findIndex(f=>f.route.id&&(s==null?void 0:s[f.route.id]));d>=0||pn(!1),l=l.slice(0,Math.min(l.length,d+1))}let u=!1,c=-1;if(r&&n&&n.v7_partialHydration)for(let d=0;d<l.length;d++){let f=l[d];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(c=d),f.route.id){let{loaderData:h,errors:p}=r,m=f.route.loader&&h[f.route.id]===void 0&&(!p||p[f.route.id]===void 0);if(f.route.lazy||m){u=!0,c>=0?l=l.slice(0,c+1):l=[l[0]];break}}}return l.reduceRight((d,f,h)=>{let p,m=!1,g=null,b=null;r&&(p=s&&f.route.id?s[f.route.id]:void 0,g=f.route.errorElement||_fe,u&&(c<0&&h===0?(Ufe("route-fallback",!1),m=!0,b=null):c===h&&(m=!0,b=f.route.hydrateFallbackElement||null)));let v=t.concat(l.slice(0,h+1)),y=()=>{let $;return p?$=g:m?$=b:f.route.Component?$=O.createElement(f.route.Component,null):f.route.element?$=f.route.element:$=d,O.createElement(Lfe,{match:f,routeContext:{outlet:d,matches:v,isDataRoute:r!=null},children:$})};return r&&(f.route.ErrorBoundary||f.route.errorElement||h===0)?O.createElement(Nfe,{location:r.location,revalidation:r.revalidation,component:g,error:p,children:y(),routeContext:{outlet:null,matches:v,isDataRoute:!0}}):y()},null)}