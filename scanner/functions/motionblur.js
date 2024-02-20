function motionblur(target, persistence) {
    return new MotionBlurLoop(target, expr_1.wrapInValue(persistence));
}