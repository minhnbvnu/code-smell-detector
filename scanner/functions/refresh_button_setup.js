function refresh_button_setup() {
    let refresh_button = document.getElementById("refresh_button")
    if (refresh_button) {
        refresh_button.onclick = () => {
            path = back_stack.slice(-1)
            if (path == null) path = ""
            display_filetree_path(filetree_obj_global, highlighting_obj_global, path, get_hue())
        }
    }
}