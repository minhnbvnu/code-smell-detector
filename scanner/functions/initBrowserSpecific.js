function initBrowserSpecific() {
    sjs.tproperty = has(doc.body.style, [
        'transform',
        'webkitTransform',
        'MozTransform',
        'OTransform',
        'msTransform']);

    sjs.requestAnimationFrame = has(global, [
        'requestAnimationFrame',
        'mozRequestAnimationFrame',
        'webkitRequestAnimationFrame',
        'oRequestAnimationFrame',
        'msRequestAnimationFrame']);

    sjs.cancelAnimationFrame = has(global, [
        'cancelAnimationFrame',
        'cancelRequestAnimationFrame',
        'mozCancelAnimationFrame',
        'mozCancelRequestAnimationFrame',
        'webkitCancelAnimationFrame',
        'webkitCancelRequestAnimationFrame',
        'oCancelAnimationFrame',
        'oCancelRequestAnimationFrame',
        'msCancelAnimationFrame',
        'msCancelRequestAnimationFrame']);

    sjs.createEventProperty = has(doc, ['createEvent', 'createEventObject']);
    browser_specific_runned = true;
}