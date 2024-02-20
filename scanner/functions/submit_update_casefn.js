function submit_update_casefn() {

    var dse = $(".update-" + $('#update_pipeline_selector').val());
    for (var elm=0; elm < $(dse).length; elm++) {
        if($(dse[elm]).find('input').attr('required')) {
            if ( ! $(dse[elm]).find('input').val() ) {
                notify_error("Required fields are not set");
                return false;
            }
        }
    }

    dropUpdate.processQueue();
}