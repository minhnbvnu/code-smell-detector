function valueProperties(val) {
        var isArr = false;
        var isObj = false;
        var isUndef = true;  //note: "" is empty but not undef

        if (val !== null && val !== undefined) {
            isArr = (val.constructor === Array);
            isObj = (val.constructor === Object);
            isUndef = (isArr && val.length === 0) || (isObj && isEmptyObject(val));
        }

        return {isArr: isArr, isObj: isObj, isUndef: isUndef};
    }