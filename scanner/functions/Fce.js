function Fce(e,t,r,n,i){switch(t){case"focusin":return es=Td(es,e,t,r,n,i),!0;case"dragenter":return ts=Td(ts,e,t,r,n,i),!0;case"mouseover":return rs=Td(rs,e,t,r,n,i),!0;case"pointerover":var a=i.pointerId;return jf.set(a,Td(jf.get(a)||null,e,t,r,n,i)),!0;case"gotpointercapture":return a=i.pointerId,Wf.set(a,Td(Wf.get(a)||null,e,t,r,n,i)),!0}return!1}