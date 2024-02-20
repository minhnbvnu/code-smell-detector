async function enableSafemode() {
    Cookies.set("Nsfw", 1, { expires: 3650 });
    alert("已开启安全模式");
    location.reload();
}