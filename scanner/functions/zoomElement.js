function zoomElement(selector, rate = 5) {
    window.onmousewheel = document.onmousewheel = e => {
        if (!isCompose(e)) return;
        const eles = document.querySelectorAll(selector);
        for (const ele of eles) {
            const zoom = ele.style.zoom ? parseInt(ele.style.zoom.replace("%", "")) : 100
            if (e.deltaY > 0) {
                ele.style.zoom = `${zoom - rate}%`;
            } else {
                ele.style.zoom = `${zoom + rate}%`;
            }
        }
    };
}