function createDialog(panel) {
        $("#sampleDialog").dialog({
            draggable : true,
            resizable : true,
            minHeight: 350,
            minWidth: 270,
            close : function(e){
                $('#dialogTrigger').focus()
                }
            ,autoOpen : false,
            describedBy : "dialogDescription",
            modal : true,
            buttons: { "Ok": function() { $(this).dialog("close"); }}});
        $('#dialogTrigger').button()
        .click(function() {
            $("#sampleDialog").dialog("open")
                .find(":input").eq(0).focus();
                return false;
            });
    }