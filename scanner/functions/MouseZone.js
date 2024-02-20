function MouseZone(x1, x2, y, clickCallback, hoverCallback, tooltipCallback, leaveCallback, willLinkActivate) {
        this.x1 = x1;
        this.x2 = x2;
        this.y = y;
        this.clickCallback = clickCallback;
        this.hoverCallback = hoverCallback;
        this.tooltipCallback = tooltipCallback;
        this.leaveCallback = leaveCallback;
        this.willLinkActivate = willLinkActivate;
    }