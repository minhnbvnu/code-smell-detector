function GM_download(url, name) {
        let downloadStyle = "width: 270px;";
        if (is_iPad()) {
            downloadStyle = "width: 320px;"
        }
        let bg = "background: #fff;";
        let fontColor = "color: #000000;"
        let topLine = " border-top: 1px solid #E0E0E0;"
        let rightLine = " border-right:1px solid #E0E0E0;"
        if (is_dark()) {
            bg = "background: #000;";
            fontColor = "color: #F3F3F3;";
            topLine = " border-top: 1px solid #565656;"
            rightLine = " border-right:1px solid #565656;"
        }
        let iconDom = "";
        if (iconUrl){
            iconDom = '<img src=' + iconUrl + ' style="width: 20px;height: 20px;">'
        }
        let text = 'Allow to download "' + name+ '"';
        let popToastTemp = [
            '<div id="downloadPop" style="' + downloadStyle + ' transform: translate(-50%, -50%);left: 50%; top: 50%; border-radius: 10px; ' + bg + ' position: fixed;z-index:999; box-shadow: 0 12px 32px rgba(0, 0, 0, .1), 0 2px 6px rgba(0, 0, 0, .6);padding-top: 6px;">',
            '<div id="gm_popTitle"  style="display: flex;flex-direction: row;align-items:center;justify-content: center;justify-items: center; padding: 4px;">' + iconDom +'<div style="padding-left:4px;font-weight:600;font-size:16px;line-height:17px; ' + fontColor +'">' + usName+'</div></div>',
            '<div id="gm_popCon" style="padding:4px 8px;font-size:15px; ' + fontColor + ' line-height: 20px;">' + text +'</div>',
            '<div id="gm_popCon" style="padding:4px 8px;font-size:13px; ' + fontColor + ' line-height:17px;text-overflow:ellipsis;overflow:hidden; -webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;">' + url + '</div>',
            '<div style="' + fontColor + topLine + ' font-size: 14px;margin-top:10px; line-height: 20px;display: flex;flex-direction: row;align-items:center;justify-content: center;justify-items: center;">',
            '<div id="gm_downloadCancel" style=" ' + rightLine +' font-size:16px;font-weight:600;color: #B620E0;width:50%;padding: 8px;text-align:center;">Cancel</div>',
            '<a id="downloadLink" target="_blank" style="font-size:16px;font-weight:600;  color: #B620E0;width:50%;padding: 8px;text-align:center;">Allow</a>',
            '</div>',
            '</div>'
        ];

        let temp = popToastTemp.join("");
        let tempDom = document.createElement("div");
        tempDom.id = "downloadContainer"
        tempDom.innerHTML = temp;
        document.body.appendChild(tempDom);

        let downloadCancelDom = document.getElementById("gm_downloadCancel");
        downloadCancelDom.addEventListener("click", function (e) {
            tempDom.remove();
        })

        let downloadLinkDom = document.getElementById("downloadLink");
        console.log("downloadLinkDom",url);
        if (url.match(new RegExp("^data:image\/.*;base64,"))){ //download image directly
            downloadLinkDom.href = url;
        }
        else{
            downloadLinkDom.href = "data:application/octet-stream," + encodeURIComponent(url);
        }

        downloadLinkDom.download = name;
        downloadLinkDom.addEventListener("click", function (e) {
            tempDom.remove();
        })

        function is_dark() {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        function is_iPad() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/iPad/i) == "ipad") {
                return true;
            } else {
                return false;
            }
        }

    }