function timerSetTimeout() {
    var speed = 50, // 设定间隔
    counter = 1,  // 计数
    start = new Date().getTime();
    
    function instance()
    {
     var ideal = (counter * speed),
     real = (new Date().getTime() - start);
     
     counter++;
    //  form.ideal.value = ideal; // 记录理想值
    //  form.real.value = real;   // 记录真实值
 
     var diff = (real - ideal);
    //  form.diff.value = diff;  // 差值
        console.log(`记录理想值:${ideal},记录真实值:${real},差值:${diff}`)
     setTimeout(function() { instance(); }, speed);
    };
    
    setTimeout(function() { instance(); }, speed);
 }