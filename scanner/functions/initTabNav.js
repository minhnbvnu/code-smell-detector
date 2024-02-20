function initTabNav() {
    $(".tabnav").tabs({
        activate: function(event, ui) {
            var tabid = ui.newPanel.attr('id');
            var id = $('.tabnav').find('[aria-controls="'+ tabid + '"]').find('a').attr('id');
            window.location.hash = id;
        },
        create: function(event, ui) {
            var id = event.target.id;
            // activate the first tab that has results, unless another tab other than the first tab is active
            if ($('#'+id+' li').not('.empty_tab_results').length > 0 && $('#'+id).tabs("option", "active") == 0) {
                $('#'+id).tabs('option', 'active', $('#'+id+' li').not('.empty_tab_results').first().index());
            }
            // disable the tabs that don't have results
            $('#'+id+' li.empty_tab_results a').removeAttr('href');
            $('#'+id+' li.empty_tab_results a').css('color', 'grey');
            $('#'+id+' li.empty_tab_results').each( function() { $('#'+id).tabs("disable", $(this).index() )});
            $('#'+id).show();
            if (window.location.hash !== "") {
                $('#'+id).tabs('option', 'active',
                $('#'+id+' a' + window.location.hash).parent().index());
            }
        },
        beforeLoad: function( event, ui ) {
            if ( ui.tab.data( "loaded" ) ) {
                event.preventDefault();
                return;
            }
            ui.jqXHR.success(function() {
                ui.tab.data( "loaded", true );
            });
        }
    });
}