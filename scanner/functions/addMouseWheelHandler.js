function addMouseWheelHandler(){
            if (document.addEventListener) {
                document.addEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
                document.addEventListener('wheel', MouseWheelHandler, false); //Firefox
            } else {
                document.attachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
            }
        }