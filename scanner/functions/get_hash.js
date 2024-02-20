function get_hash() {
    if (document.getElementById("input_autofill").files[0] === undefined) {
        $('#btn_rfile_proc').text("Please select a file");
        return;
    }
    getMD5(
        document.getElementById("input_autofill").files[0],
        prog => $('#btn_rfile_proc').text("Processing "+ (prog * 100).toFixed(2) + "%")
    ).then(
        res => on_done_hash(res),
        err => console.error(err)
    );
}