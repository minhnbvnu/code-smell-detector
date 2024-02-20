function startdrag(e) {
					dragstart = true;
					dragged = false;
					dragstartX = e.clientX;
					dragstartY = e.clientY;
					dragoffsetX = dragstartX - parseFloat(outerdiv.style.left);
					dragoffsetY = dragstartY - parseFloat(outerdiv.style.top);
				}