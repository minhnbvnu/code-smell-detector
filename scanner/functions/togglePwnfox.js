async function togglePwnfox(enabled) {
    const color = enabled ? "#00ff00" : "#ff0000"
    const [canvas] = await createIcon(color)
    const iconContainer = document.getElementById("icon")
    iconContainer.replaceChild(canvas, iconContainer.firstChild)

    const main = document.querySelector("main")
    if (!enabled) {
        main.classList.add('disabled')
    } else {
        main.classList.remove('disabled')
    }
}