function ade(e,t){if(rc)return e==="compositionend"||!VT&&vj(e,t)?(e=mj(),Im=NT=qo=null,rc=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return gj&&t.locale!=="ko"?null:t.data;default:return null}}