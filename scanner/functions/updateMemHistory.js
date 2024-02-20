function updateMemHistory(){
    getMemUsage(function(usage){
        mem_history.used.shift();
        mem_history.used.push(Math.round((usage.capacity-usage.availableCapacity)/usage.capacity*100));
        showMem();
    });
}