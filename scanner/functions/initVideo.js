function initVideo(){
        createAlignButton( ["videoFloat", "upload_alignment"] );
        addUrlChangeListener($G("videoUrl"));
        addOkListener();

        //编辑视频时初始化相关信息
        (function(){
            var img = editor.selection.getRange().getClosedNode(),url;
            if(img && img.className){
                var hasFakedClass = (img.className == "edui-faked-video"),
                    hasUploadClass = img.className.indexOf("edui-upload-video")!=-1;
                if(hasFakedClass || hasUploadClass) {
                    $G("videoUrl").value = url = img.getAttribute("_url");
                    $G("videoWidth").value = img.width;
                    $G("videoHeight").value = img.height;
                    var align = domUtils.getComputedStyle(img,"float"),
                        parentAlign = domUtils.getComputedStyle(img.parentNode,"text-align");
                    updateAlignButton(parentAlign==="center"?"center":align);
                }
                if(hasUploadClass) {
                    isModifyUploadVideo = true;
                }
            }
            createPreviewVideo(url);
        })();
    }