function toggle_selector() {
    //activating selector toggle
    if(selector_active == false) {
        selector_active = true;

        //blend in conditional buttons to perform actions on selected rows - e.g. select graph, summary, color
        $(".btn-conditional").show(250);
        //highligh the selection button
        $("#selector-btn").addClass("btn-active");
        //$("#selector-btn").load();
        //remove data toggle attribute to disable expand feature
        $("[id^=dropa_]").removeAttr('data-toggle');

        //create click handler for timeline events
        $(".timeline li .timeline-panel").on('click', function(){
            if($(this).hasClass("timeline-selected")) {
                $(this).removeClass("timeline-selected");
            } else {
                $(this).addClass("timeline-selected");
            }
        });

        $(".timeline li .timeline-panel-t").on('click', function(){
            if($(this).hasClass("timeline-selected")) {
                $(this).removeClass("timeline-selected");
            } else {
                $(this).addClass("timeline-selected");
            }
        });

    }

    //deactivating selector toggle
    else if(selector_active == true) {
        selector_active = false;
        $(".btn-conditional").hide(250);
        $(".btn-conditional-2").hide(250);
        $("#selector-btn").removeClass("btn-active");
        //restore the collapse feature
        $("[id^=dropa_]").attr('data-toggle','collapse');
        $(".timeline-selected").removeClass("timeline-selected");

        $(".timeline li .timeline-panel").off('click');
        apply_filtering();
    }
}