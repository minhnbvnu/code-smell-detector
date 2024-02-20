function case_pipeline_popup() {
    url = '/case/pipelines-modal' + case_param();
    $('#info_case_modal_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }
        $('#modal_case_detail').modal({ show: true });
        $("#update_pipeline_selector").selectpicker({
            liveSearch: true,
            style: "btn-outline-white"
            })
        $('#update_pipeline_selector').selectpicker("refresh");
        $(".control-update-pipeline-args ").hide();
        $('.control-update-pipeline-'+ $('#update_pipeline_selector').val() ).show();
        $('#update_pipeline_selector').on('change', function(e){
          $(".control-update-pipeline-args ").hide();
          $('.control-update-pipeline-'+this.value).show();
        });
        $('[data-toggle="popover"]').popover();
    });
}