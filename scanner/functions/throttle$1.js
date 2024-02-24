function throttle$1(delay,noTrailing,callback,debounceMode){var timeoutID,cancelled=!1,lastExec=0;function clearExistingTimeout(){timeoutID&&clearTimeout(timeoutID)}function wrapper(){for(var _len=arguments.length,arguments_=new Array(_len),_key=0;_key<_len;_key++)arguments_[_key]=arguments[_key];var self=this,elapsed=Date.now()-lastExec;function exec(){lastExec=Date.now(),callback.apply(self,arguments_)}cancelled||(debounceMode&&!timeoutID&&exec(),clearExistingTimeout(),void 0===debounceMode&&elapsed>delay?exec():!0!==noTrailing&&(timeoutID=setTimeout(debounceMode?function clear(){timeoutID=void 0}:exec,void 0===debounceMode?delay-elapsed:delay)))}return"boolean"!=typeof noTrailing&&(debounceMode=callback,callback=noTrailing,noTrailing=void 0),wrapper.cancel=function cancel(){clearExistingTimeout(),cancelled=!0},wrapper}