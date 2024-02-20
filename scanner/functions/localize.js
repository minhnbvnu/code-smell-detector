function localize(ele, options) {
            var key = ele.getAttribute(o.selectorAttr);
            if (!key && typeof key !== 'undefined' && key !== false) key = ele.textContent || ele.value;
            if (!key) return;
    
            var target = ele
              , targetSelector = ele.getAttribute("i18n-target");
            if (targetSelector) {
                target = ele.querySelector(targetSelector) || ele;
            }
            
            if (key.indexOf(';') >= 0) {
                var keys = key.split(';'), index = 0, length = keys.length;
                
                for ( ; index < length; index++) {
                    if (keys[index] !== '') parse(target, keys[index], options);
                }
    
            } else {
                parse(target, key, options);
            }
        }