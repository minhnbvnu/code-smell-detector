function over_btn(e){
    if(!e){
        e = window.event;
    }
    btn_move(this, e.clientX, e.clientY);
}