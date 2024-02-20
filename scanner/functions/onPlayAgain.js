function onPlayAgain(button) {
    button.classList.remove("shake")
    const gtc = document.querySelector("#gtc")
    gtc.style.opacity = 0
    buildGTC()
    setTimeout(() => {
        document.querySelector("#gtc_form input:checked").focus()
        gtc.style.opacity = 1
    }, 100)
}