function parse_PtgExtraArray(blob){var cols=1+blob.read_shift(1);var rows=1+blob.read_shift(2);for(var i=0,o=[];i!=rows&&(o[i]=[]);++i)for(var j=0;j!=cols;++j)o[i][j]=parse_SerAr(blob);
    return o}