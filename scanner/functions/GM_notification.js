function GM_notification(param1, param2, param3, param4) {
        let details = {};
        let ondone = null;
        if (typeof param1 === "object" || typeof param2 === "function") {
            details = param1;
            ondone = param2;
        } else {
            let detail = { text: param1, title: param2, image: param3, onclick: param4 }
            details = detail;
        }

        let text = details.text ? details.text : "";
        let title = details.title ? details.title : "";
        let image = details.image ? details.image : "";
        let timeout = details.timeout || 8000;
        let onclick = details.onclick;

        // let stayImg = browser.runtime.getURL("images/icon-256.png");
        let notificationStyle = "width: 270px;height: 57px;transform: translateX(-50%);left: 50%;";
        if (is_iPad()) {
            notificationStyle = "width: 320px;height: 72px; right: 10px;"
        }
        let bg = "background: #fff;";
        let fontColor = "color: #000000;"
        if (is_dark()) {
            bg = "background: #000;";
            fontColor = "color: #F3F3F3;"
        }
        let popToastTemp = [
            '<div id="notificationPop" style="' + notificationStyle + ' top: 10px; border-radius: 10px; ' + bg + ' position: fixed;z-index:999; box-shadow: 0 12px 32px rgba(0, 0, 0, .1), 0 2px 6px rgba(0, 0, 0, .08);display: flex;flex-direction: row;padding: 4px;">',
            '<div id="notifyImg"  style="text-decoration: none;width: 75px;display: flex;flex-direction: row;align-items:center;justify-content: center;justify-items: center;"><img src=' + image + ' style="width: 46px;height: 46px; border-radius: 4px;"></img></div>',
            '<div id="notificationCon" style="padding:0 4px;font-family:Helvetica Neue;text-decoration: none;display: flex;flex-direction: column;justify-content: center;justify-items: center;align-items:start;line-height:23px;">',
            '<div style="font-size: 16px; color: #B620E0;font-weight:700;">' + title + '</div>',
            '<div style="font-size: 12px;' + fontColor + ' line-height: 15px;padding-top:2px;text-overflow:ellipsis;overflow:hidden; -webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;">' + text + '</div>',
            '</div>',
            '</div>'
        ];
        let temp = popToastTemp.join("");
        let tempDom = document.createElement("div");
        tempDom.id = "notificationContainer"
        tempDom.innerHTML = temp;
        document.body.appendChild(tempDom);
        let notificationDom = document.getElementById("notificationContainer");
        notificationDom.addEventListener("click", () => {
            if (onclick) {
                onclick();
            }
        })
        var clearFlag = 0;
        function autoClose() {
            if (timeout > 0) {
                timeout = timeout - 500;
            } else {
                window.clearInterval(clearFlag);
                // notificationDom.removeEventListener("click");
                notificationDom.remove();
                if (ondone) {
                    ondone();
                }
            }
        }
        clearFlag = window.setInterval(() => {
            autoClose();
        }, 500);

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