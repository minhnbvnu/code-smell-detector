function init_cpu_history(){
    for(var i=0; i<ponits_num; i++){
        cpu_history.user.push(0);
        cpu_history.kernel.push(0);
        cpu_history.total.push(0);
    }
    chrome.system.cpu.getInfo(function(info){
        for(var i=0; i<info.processors.length; i++){
            cpu_history.last_total.push(info.processors[i].usage.total);
            cpu_history.last_user.push(info.processors[i].usage.user);
            cpu_history.last_kernel.push(info.processors[i].usage.kernel);
        }
        init_mem_history();
    });
}