function vce(e){var t=e.alternate;if(!t){if(t=Eu(e),t===null)throw Error(ye(188));return t!==e?null:e}for(var r=e,n=t;;){var i=r.return;if(i===null)break;var a=i.alternate;if(a===null){if(n=i.return,n!==null){r=n;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===r)return TM(i),e;if(a===n)return TM(i),t;a=a.sibling}throw Error(ye(188))}if(r.return!==n.return)r=i,n=a;else{for(var l=!1,s=i.child;s;){if(s===r){l=!0,r=i,n=a;break}if(s===n){l=!0,n=i,r=a;break}s=s.sibling}if(!l){for(s=a.child;s;){if(s===r){l=!0,r=a,n=i;break}if(s===n){l=!0,n=a,r=i;break}s=s.sibling}if(!l)throw Error(ye(189))}}if(r.alternate!==n)throw Error(ye(190))}if(r.tag!==3)throw Error(ye(188));return r.stateNode.current===r?e:t}