function changeRelationshipReason(event, element) {
	event.preventDefault();
	var currentReason = element.html().trim();
	element.editable(function(value, settings) {
	    return function(value, settings, elem) {
	        var guardian = $(elem).parent();
	        var data = {
	                 reverse_type: guardian.attr('rtype'),
	                 dest_id: guardian.attr('rvalue'),
	                 my_type: guardian.attr('mtype'),
	                 my_value: guardian.attr('mvalue'),
	                 forward_relationship: guardian.attr('frel'),
	                 relationship_date: guardian.attr('rdate'),
	                 forge_date: guardian.attr('fdate'),
	                 new_reason: value,
	        };
	        $.ajax({
	            type: "POST",
	            async: false,
	            url: $(elem).attr('action'),
	            data: data,
	            success: function(data) {
	                if (data.success) {
	                     guardian.attr('new_reason', value);
	                     currentReason = value;
	                }
	            },
	        });
	        return value;
	    }(value, settings, this);
	},
	{
	    event:'reason_edit',
	    type: 'textarea',
	    data: function() {
	        return currentReason;
	    },
	    style:"display:inline",
	    onblur:'submit',
	});
	element.trigger('reason_edit');
}