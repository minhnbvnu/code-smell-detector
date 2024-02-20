function gen_report(safe) {
    url = '/case/report/generate-investigation/' + $("#select_report option:selected").val() + case_param();
    if (safe === true) {
        url += '&safe=true';
    }
    window.open(url, '_blank');
}