function addactionbtn(info) {
    var buttons_el = document.getElementById("buttons");

    var button_container_el = document.createElement("li");
    button_container_el.classList.add("action");
    button_container_el.id = info.id + "_container";

    var button_el = document.createElement("button");
    button_el.classList.add("action");
    button_el.id = info.id;
    button_el.innerText = info.name;
    button_el.onclick = function() {
        chrome.runtime.sendMessage({
            type: "popupaction",
            data: {
                action: info.action
            }
        });
    };
    button_container_el.appendChild(button_el);

    return new Promise(function(resolve) {
        if (!info.toggle_setting) {
            buttons_el.appendChild(button_container_el);
            resolve();
        } else {
            get_option(info.toggle_setting, function(value) {
                if (value) {
                    buttons_el.appendChild(button_container_el);
                }

                resolve();
            }, info.toggle_default || false)
        }
        resolve();
    })
}