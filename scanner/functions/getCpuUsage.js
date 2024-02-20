function getCpuUsage(callback){
    chrome.system.cpu.getInfo(function(info){
        var total = 0;
        var user = 0;
        var kernel = 0;
        for(var i=0; i<info.processors.length; i++){
            total += info.processors[i].usage.total - cpu_history.last_total[i];
            cpu_history.last_total[i] = info.processors[i].usage.total;
            user += info.processors[i].usage.user - cpu_history.last_user[i];
            cpu_history.last_user[i] = info.processors[i].usage.user;
            kernel += info.processors[i].usage.kernel - cpu_history.last_kernel[i];
            cpu_history.last_kernel[i] = info.processors[i].usage.kernel;
        }
        user = Math.round(user/total*100);
        kernel = Math.round(kernel/total*100);
        callback({user:user,kernel:kernel,total:user+kernel});
    });
}