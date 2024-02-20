function handleExecScriptManually(uuid, name) {
    if (uuid && uuid != "" && typeof uuid == "string") {
        browser.runtime.sendMessage({
            from: "popup",
            operate: "exeScriptManually",
            uuid: uuid,
        }, (response) => {
            console.log("exeScriptManually response,", response)
        });
        // 改变数据manually状态
        scriptStateList.forEach(function (item, index) {
            if (uuid == item.uuid) {
                item.manually = "1";
            }
        })
        renderScriptContent(scriptStateList)

        let timeout = 3000;
        let toastContainer = document.getElementById("toastContainer");
        document.querySelector("#toastContainer .title").setInnerHtml(name);
        toastContainer.style.display = "flex"
        toastContainer.className = "toast-container toast-show"
        var clearFlag = 0;
        clearFlag = window.setInterval(() => {
            autoClose();
        }, 500);

        function autoClose() {
            if (timeout > 0) {
                timeout = timeout - 500;
            } else {
                window.clearInterval(clearFlag);
                toastContainer.className = "toast-container toast-hide"
            }
        }
    }
}