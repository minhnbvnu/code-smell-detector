function testForIn(value){
        var i,
            count = 0,
            klass = function(){ this.toString = 1; };

        for(i in new klass){
            count++;
        }
        return count == value;
    }