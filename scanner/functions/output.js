function output(value) {
    if(!log_output) {
        log_output = doc.createElement('textarea');
        log_output.style.height = "200px";
        log_output.style.width = (window.innerWidth - 100) + 'px';
        doc.body.appendChild(log_output);
    }
    log_output.value = log_output.value + value;
    log_output.scrollTop = log_output.scrollHeight;
}