function AH(n){var t=Ct(n).rootTarget;if(n.type!=="touchmove"&&B5!==t&&(B5=t,V2=IH(Ct(n).path)),!V2.length)return!0;if(n.type==="touchstart")return!1;var e=RH(n);return!kH(V2,e.deltaX,e.deltaY)}