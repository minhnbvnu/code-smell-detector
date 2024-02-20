function typecastVal(val){
        if (rArr.test(val)){
            val = val.replace(rArr, '$1').split(',');
        } else if (val === 'null'){
            val = null;
        } else if (val === 'false'){
            val = false;
        } else if (val === 'true'){
            val = true;
        } else if (val === '' || val === "''" || val === '""'){
            val = '';
        } else if (! isNaN(val)) {
            //isNaN('') == false
            val = +val;
        }
        return val;
    }