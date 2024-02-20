function gen_act_report(safe) {
    url = '/case/report/generate-activities/' + $("#select_report_act option:selected").val() + case_param();
    if (safe === true) {
        url += '&safe=true';
    }
    window.open(url, '_blank');
}