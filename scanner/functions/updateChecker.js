function updateChecker(method) {
    if (method === 2) {
        manuallyCheckText = document.getElementById("manually").innerHTML;
        document.getElementById("manually").innerHTML = "...";
    }
    fetch('https://gitee.com/roderickqiu/wnr-backup/raw/master/package.json')
        .then(res => res.json())
        .then(json => {
            if (compareVersion(json.version, version) === 1) {
                ipc.send("update-feedback", "update-available");
            } else if (method === 2) {// manually
                ipc.send("update-feedback", "no-update");
            }
            if (method === 2) document.getElementById("manually").innerHTML = manuallyCheckText;
        })
        .catch(() => {
            if (method === 2) {
                ipc.send("update-feedback", "web-problem");
                document.getElementById("manually").innerHTML = manuallyCheckText;
            }
        });
    store.set("last-check-time", nowTime);
}