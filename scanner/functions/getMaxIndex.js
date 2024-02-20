function getMaxIndex(){
        var max = items.length-1;
        if (!me.centerSelection) {
            max = items.length-visibleIitems;
        }
        if (max<0) max=0;
        return max;
    }