function mouseMoveEvent(event) {
        that.mouse.position = {
            x: (event.clientX - that.dom.offsetLeft) / scene.xscale,
            y: (event.clientY - that.dom.offsetTop) / scene.yscale
        };
    }