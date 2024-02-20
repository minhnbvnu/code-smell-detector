function display_filetree_path(filetree_obj, highlighting_obj, path, hue) {
    MAX_DEPTH = 0
    const [SVG_ROOT, x, y, aspect_ratio] = get_drawing_params()
    display_filetree(get_child_from_path(filetree_obj, path), get_child_from_path(highlighting_obj, path), SVG_ROOT, x, y, aspect_ratio, path, hue)
}