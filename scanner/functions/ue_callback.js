function ue_callback(url, state) {
    var doc = document,
        picBorard = $G("J_picBoard"),
        img = doc.createElement("img");

    //图片缩放
    function scale(img, max, oWidth, oHeight) {
        var width = 0, height = 0, percent, ow = img.width || oWidth, oh = img.height || oHeight;
        if (ow > max || oh > max) {
            if (ow >= oh) {
                if (width = ow - max) {
                    percent = (width / ow).toFixed(2);
                    img.height = oh - oh * percent;
                    img.width = max;
                }
            } else {
                if (height = oh - max) {
                    percent = (height / oh).toFixed(2);
                    img.width = ow - ow * percent;
                    img.height = max;
                }
            }
        }
    }

    //移除遮罩层
    removeMaskLayer();
    //状态响应
    if (state == "SUCCESS") {
        picBorard.innerHTML = "";
        img.onload = function () {
            scale(this, 300);
            picBorard.appendChild(img);

            var obj = new scrawl();
            obj.btn2Highlight("J_removeImg");
            //trace 2457
            obj.btn2Highlight("J_sacleBoard");
        };
        img.src = url;
    } else {
        alert(state);
    }
}