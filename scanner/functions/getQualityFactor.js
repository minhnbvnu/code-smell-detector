function getQualityFactor(filesize) {
    if(filesize <= 1024*110)   return 88;     // less than 110 kB
    else if(filesize <= 1024*510) return 85;    // less than 510 kB
    else return 80;     // default 80
}