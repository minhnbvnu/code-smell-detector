function displayMenu(pools){
    $('#poolList').after(Object.keys(pools).map(function(poolName){
        return '<li class="poolMenuItem"><a href="#">' + poolName + '</a></li>';
    }).join(''));
}