function formatFileSize(size){
    var unit = "k";
    if (isNaN(size)) size=0;
    size = Math.round(size/1000);
    if (size>1000){
        size = Math.round(size/100)/10;
        unit = "MB"
    }
    return size + unit;
}