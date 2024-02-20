function clickEvent(event) {
        that.mouse.click = {
            x: (event.clientX - that.dom.offsetLeft) / scene.xscale,
            y: (event.clientY - that.dom.offsetTop) / scene.yscale
        };
    }