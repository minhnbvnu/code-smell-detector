function init_mem_history(){
    for(var i=0; i<ponits_num; i++){
        mem_history.used.push(0);
    }
    updateData();
    setInterval(updateData, 1000);
}