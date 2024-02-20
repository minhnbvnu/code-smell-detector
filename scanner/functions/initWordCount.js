function initWordCount(){
    countTextbox();
    setInterval(function(){
        countTextbox();
    }, 1000);
    
}