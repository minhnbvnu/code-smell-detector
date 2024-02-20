function qtip_container_setup() {
    $('.qtip-container').each(function() {
        $(this).qtip({
            content: $(this).next('div.qtip-body'),
            show: 'click',
            events: {
                hide: function(event, api) {
                    // Reset hide event when it hides...?
                    if (api.get('hide.event') === false) {
                        api.set('hide.event', 'mouseleave');
                    }
                }
            },
            style: {
                classes: 'ui-tooltip-dark ui-tooltip-rounded ui-tooltip-shadow',
                width: '415px'
            },
            position: {
                my: 'top right',
                at: 'bottom left',
                adjust: {
                    x: -5
                }
            }
        }).bind('click', function() {
            $(this).qtip('option', 'hide.event', 'click');
        });
    });
    // dirty hacks so we can close qtip clicking on anything but the qtip and
    // sub-elements for the qtip-body, datepicker, and relationship-type
    $(document).click(function() {
        $('.qtip-container').qtip('hide');
    });
    $(".relationship_reason_edit").click(function(e) {
    	changeRelationshipReason(e, $(this));
    });


    $('.qtip-body').click(function(e) {
      e.stopPropagation();
    });
}