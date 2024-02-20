function uploadWin(res) {
        var data = JSON.parse(res.response);
        var labels = data.images[0].labels;
        var result = "<p>Detected the following possible items:<br/>";
        for(var i=0, len=labels.length; i<len; i++) {
            result += "<b>"+labels[i].label_name + "</b><br/>";   
        }
        $("#status").html(result);
    }