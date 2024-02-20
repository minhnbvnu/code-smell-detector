function export_svg_setup() {
    const el = document.getElementById("save_button")
    const button = el.querySelector("input")
    button.onclick = () => {
        const link = document.createElement("a")
        const svg_data = document.getElementById("treemap_root_svg").outerHTML
        const blob = new Blob([svg_data], {type:"image/svg+xml;charset=utf-8"})
        const download_url = URL.createObjectURL(blob)
        link.href = download_url
        link.download = `${DATABASE_NAME}.svg`
        link.click()
    }
}