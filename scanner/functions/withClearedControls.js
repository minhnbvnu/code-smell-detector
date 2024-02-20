function withClearedControls(func) {
    return ctx => {
        let controls = ctx.controls;
        let texture = ctx.controlsTexture;
        try {
            ctx.controls = Controls.NONE;
            ctx.controlsTexture = controlMaskTex(ctx, ctx.controls);
            return func(ctx);
        } finally {
            ctx.controlsTexture.deallocByDepositingInPool('withClearedControls');
            ctx.controlsTexture = texture;
            ctx.controls = controls;
        }
    };
}