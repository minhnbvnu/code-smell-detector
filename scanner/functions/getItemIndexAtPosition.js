function getItemIndexAtPosition(x){
        if (items && items.length){
            for (var i = 0, max = items.length; i<max;i++){
                var item = items[i];
                if (x>=item.startX-(itemMargin/2) && x<=item.startX+item.width+(itemMargin/2)){
                    return i;
                }
            }
        }
        return -1;
    }