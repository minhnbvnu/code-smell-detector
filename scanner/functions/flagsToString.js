function flagsToString(e, flags) {
        var builder = "";
        for(var i = 1; i < (1 << 31); i = i << 1) {
            if((flags & i) != 0) {
                for(var k in e) {
                    if(e[k] == i) {
                        if(builder.length > 0) {
                            builder += "|";
                        }
                        builder += k;
                        break;
                    }
                }
            }
        }
        return builder;
    }