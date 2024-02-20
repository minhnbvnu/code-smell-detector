function watchFormatting(){
    var b = document.queryCommandState("Bold");
    var bi = document.getElementById("icon-b");
    var i = document.queryCommandState("italic");
    var ii = document.getElementById("icon-i");
    
    if (b === true){
        bi.className = "fa fa-bold active"
    } else {
        bi.className = "fa fa-bold"
    }
    if (i === true){
        ii.className = "fa fa-italic active"
    } else {
        ii.className = "fa fa-italic"
    }
}