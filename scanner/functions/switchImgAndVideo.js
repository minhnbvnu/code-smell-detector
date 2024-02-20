function switchImgAndVideo(root,img2video){
        utils.each(root.getNodesByTagName(img2video ? 'img' : 'embed video'),function(node){
            var className = node.getAttr('class');
            if(className && className.indexOf('edui-faked-video') != -1){
                var html = creatInsertStr( img2video ? node.getAttr('_url') : node.getAttr('src'),node.getAttr('width'),node.getAttr('height'),null,node.getStyle('float') || '',className,img2video ? 'embed':'image');
                node.parentNode.replaceChild(UE.uNode.createElement(html),node);
            }
            if(className && className.indexOf('edui-upload-video') != -1){
                var html = creatInsertStr( img2video ? node.getAttr('_url') : node.getAttr('src'),node.getAttr('width'),node.getAttr('height'),null,node.getStyle('float') || '',className,img2video ? 'video':'image');
                node.parentNode.replaceChild(UE.uNode.createElement(html),node);
            }
        })
    }