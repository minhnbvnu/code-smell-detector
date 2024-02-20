function updateCpuHistory(){
    getCpuUsage(function(usage){
        cpu_history.user.shift();
        cpu_history.user.push(usage.user);
        cpu_history.kernel.shift();
        cpu_history.kernel.push(usage.kernel);
        cpu_history.total.shift();
        cpu_history.total.push(usage.total);
        showCpu();
    });
}