function make_list_item(text) {
    let el = document.createElement("div")
    el.classList.add("list_item")
    let text_el = document.createElement("div", )
    el.appendChild(text_el)
    text_el.classList.add("list_item_text")
    text_el.innerText = text
    let close_button = document.createElement("button")
    el.appendChild(close_button)
    close_button.innerText = "x";
    close_button.width = "1em";
    close_button.classList.add("close_button")
    close_button.onclick = () => {
        el.parentElement.removeChild(el)
    }
    el.onclick = () => {
        el.classList.toggle("item_negated")
    }
    return el
}