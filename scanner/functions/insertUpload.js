function insertUpload(){
        var videoObjs=[],
            uploadDir = editor.getOpt('videoUrlPrefix'),
            width = $G('upload_width').value || 420,
            height = $G('upload_height').value || 280,
            align = findFocus("upload_alignment","name") || 'none';
        for(var key in uploadVideoList) {
            var file = uploadVideoList[key];
            videoObjs.push({
                url: uploadDir + file.url,
                width:width,
                height:height,
                align:align
            });
        }

        var count = uploadFile.getQueueCount();
        if (count) {
            $('.info', '#queueList').html('<span style="color:red;">' + '还有2个未上传文件'.replace(/[\d]/, count) + '</span>');
            return false;
        } else {
            editor.execCommand('insertvideo', videoObjs, 'upload');
        }
    }