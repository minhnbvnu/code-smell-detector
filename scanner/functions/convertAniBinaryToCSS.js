function convertAniBinaryToCSS(selector, aniBinary) {
    var ani = readAni(aniBinary);
    var animationName = "ani-cursor-" + uniqueId();
    var keyframes = ani.frames.map(function (_a) {
        var url = _a.url, percents = _a.percents;
        var percent = percents.map(function (num) { return num + "%"; }).join(", ");
        return percent + " { cursor: url(" + url + "), auto; }";
    });
    // CSS properties with a animation type of "discrete", like `cursor`, actually
    // switch half-way _between_ each keyframe percentage. Luckily this half-way
    // measurement is applied _after_ the easing function is applied. So, we can
    // force the frames to appear at exactly the % that we specify by using
    // `timing-function` of `step-end`.
    //
    // https://drafts.csswg.org/web-animations-1/#discrete
    var timingFunction = "step-end";
    // Winamp (re)starts the animation cycle when your mouse enters an element. By
    // default this approach would cause the animation to run continuously, even
    // when the cursor is not visible. To match Winamp's behavior we add a
    // `:hover` pseudo selector so that the animation only runs when the cursor is
    // visible.
    var pseudoSelector = ":hover";
    // prettier-ignore
    return "\n    @keyframes " + animationName + " {\n        " + keyframes.join("\n") + "\n    }\n    " + selector + pseudoSelector + " {\n        animation: " + animationName + " " + ani.duration + "ms " + timingFunction + " infinite;\n    }\n   ";
}