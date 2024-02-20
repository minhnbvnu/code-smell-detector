function case_param() {
    var params = {
        cid: get_caseid
    }
    return '?'+ $.param(params);
}