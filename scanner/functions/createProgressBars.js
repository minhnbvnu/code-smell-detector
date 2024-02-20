function createProgressBars(panel) {
        $(panel).find('#progressTrigger').button()
            .click(function() {
                $("#progressMsg").remove();
                var progressBar = $("#sampleProgressBar")
                .progressbar({
                     value: 0,
                     labelledBy: "progressMsg"
                 });
                var progressDialog = $("#progressDialog")
                .append("<p id='progressMsg' aria-live='true'>Your file is being downloaded...</p>")
                .dialog({autoOpen : true,
                    modal : true,
                    title :  "progress",
                    resizable : false,
                    draggable : false,
                    dialogClass : "noCloseBtn",
                    width : 500,
                    beforeClose : function() {
                    if ($("#sampleProgressBar").progressbar('value') != 100)
                        return false;}
                })

                var progressUpdater;

                setTimeout(function() {
                    $("#sampleProgressBar").progressbar('value', 0);
                    progressUpdater = setInterval(function() {
                        if ($("#sampleProgressBar").progressbar('value') == 100) {
                            clearInterval(progressUpdater);
                            $("#progressDialog").dialog("close");
                            $('#progressTrigger').focus();
                        }
                        $("#sampleProgressBar").progressbar('value', $("#sampleProgressBar").progressbar('value') + 2);
                        }, 250);
                }, 100);
            });
    }