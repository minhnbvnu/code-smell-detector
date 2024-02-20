function instanceCompare(a, b) {
        if(((a == null) || (!a.isInstanceProperty()))) {
            return b;
        } else {
            return a;
        }
    }