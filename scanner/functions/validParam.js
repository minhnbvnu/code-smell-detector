function validParam(param, $el) {
        if ($el === undefined) {
            return '$el needed!';
        }
        if ($el.length === 0) {
            return 'not find $el!';
        }
        return true;
    }