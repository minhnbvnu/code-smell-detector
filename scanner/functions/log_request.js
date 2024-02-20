function log_request(type, obj) {
            obj.addEventListener('success', log('capture ' + type + '.success'), true);
            obj.addEventListener('success', log('bubble  ' + type + '.success'), false);
            obj.addEventListener('error', log('capture ' + type + '.error'), true);
            obj.addEventListener('error', log('bubble  ' + type + '.error'), false);
        }