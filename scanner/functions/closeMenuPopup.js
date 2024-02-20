function closeMenuPopup(e) {
    document.getElementById("registerMenuWarpper").className = "register-menu-warpper filter-form-hide";
    let registerMenuPopupDom = document.getElementById("registerMenuPopup");
    registerMenuPopupDom.style.display = "none";

    noneMenuDom.removeEventListener("click", function (params) { })
    registerMenuConDom.removeEventListener("click", function (params) {})
}