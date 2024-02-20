function pageAnimation() {
    // console.log("pageAnimation")
    const element = document.querySelector("#page_animation")
    element.classList.remove("page_animation")
    setTimeout(() => element.classList.add("page_animation"), 10)
}