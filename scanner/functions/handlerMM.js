function handlerMM(e){ //从事件得到鼠标光标在页面上的位置
	e=e||window.event;
	x = (document.layers) ? e.pageX : document.body.scrollLeft+e.clientX-220;
	y = (document.layers) ? e.pageY : document.body.scrollTop+e.clientY-35;
}