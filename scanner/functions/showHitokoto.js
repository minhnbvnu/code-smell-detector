function showHitokoto(){
    $.getJSON('https://v1.hitokoto.cn/',function(result){
        showMessage(result.hitokoto, 5000);
    });
}