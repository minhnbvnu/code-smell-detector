function onCamSuccess(imageData) {
		var image = document.getElementById('myImage');
        $("#imgDisplay").attr("src", imageData);

        $("#status").html("<i>Uploading picture for BlueMix analysis...</i>");
        
        var options = new FileUploadOptions();
        options.fileKey = "img_file";
        options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
        
        options.headers = {'Authorization': authHeaderValue(API_USER, API_PASSWORD) };
        
        var ft = new FileTransfer();
        ft.upload(imageData, encodeURI(API_URL+"/v1/tag/recognize"), uploadWin, uploadFail, options);

    }