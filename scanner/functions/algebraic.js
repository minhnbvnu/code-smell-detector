function algebraic(i){
        var f = file(i), r = rank(i);
        return 'abcdefgh'.substring(f,f+1) + '87654321'.substring(r,r+1);
    }