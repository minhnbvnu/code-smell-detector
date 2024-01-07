constructor(target) {
        super(target);
        this.drawTool = new DrawTool({
            'mode'   : 'boxZoom',
            'ignoreMouseleave' : false
        });
    }