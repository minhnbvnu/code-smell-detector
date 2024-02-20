function centerDialog(node) {
        var nodeHeight = node.offsetHeight;
        var windowHeight = window.innerHeight ? window.innerHeight
            : document.documentElement.clientHeight ? document.documentElement.clientHeight
            : screen.height;
        var top = (windowHeight / 2) - (nodeHeight / 2);
        node.style.top = top + "px";
    }