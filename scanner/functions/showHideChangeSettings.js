function showHideChangeSettings(text, ms, dim) {
    const changeSetting = document.querySelector("#change_setting p")
    changeSetting.textContent = text
    changeSetting.style.visibility = "visible"
    if (dim) {
        document.querySelector("#nav_form").classList.add("faded")
        document.querySelector("#main_scale").classList.add("faded")
    }
    clearTimeout(changeSettingTimeoutID)
    changeSettingTimeoutID = setTimeout(() => {
        changeSetting.style.visibility = "hidden"
        if (dim) {
            document.querySelector("#nav_form").classList.remove("faded")
            document.querySelector("#main_scale").classList.remove("faded")
        }
    }, ms ?? 1000)
}