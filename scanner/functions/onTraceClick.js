function onTraceClick (ev) {
    if (ev.preventDefault) ev.preventDefault();
    if (ev.stopPropagation) ev.stopPropagation();


    var tgt = ev.target;
    if (tgt.className !== 'trace') return;

    var input = tgt.parentElement.getElementsByClassName('trace-copy')[0];
    if (!input) return;

    input.style.display = 'inline';
    input.style.width = tgt.offsetWidth + 'px';
    input.focus();
    input.select();

    input.onblur = function () {
        input.style.display = 'none';
        tgt.style.display = 'inline';
    };

    tgt.style.display = 'none';
}