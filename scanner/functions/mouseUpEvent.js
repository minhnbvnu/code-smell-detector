function mouseUpEvent(event) {
        that.mousedown = false;
        that.mouse.down = false;
        that.mousereleased = true;
        that.mouse.click = {
            x: (event.clientX - that.dom.offsetLeft) / scene.xscale,
            y: (event.clientY - that.dom.offsetTop) / scene.yscale
        };
    }