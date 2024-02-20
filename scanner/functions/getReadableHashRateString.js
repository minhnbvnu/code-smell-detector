function getReadableHashRateString(hashrate){
    var i = -1;
    var byteUnits = [ ' KH', ' MH', ' GH', ' TH', ' PH' ];
    do {
        hashrate = hashrate / 1024;
        i++;
    } while (hashrate > 1024);
    return Math.round(hashrate) + byteUnits[i];
}