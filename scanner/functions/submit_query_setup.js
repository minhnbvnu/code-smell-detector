function submit_query_setup() {
    let submit_button = document.getElementById("submit_query")
    if (submit_button) {
        submit_button.onclick = () => {
            const query = get_query_object()
            save_query(query)
            display_filetree_with_params({}, query, get_hue())
        }
    }
}