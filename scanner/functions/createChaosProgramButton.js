function createChaosProgramButton(name, lang) {
    let btn = document.createElement("button");
    let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    console.log("[CREATE-CHAOS-PROGRAM] Creating button for " + name);
    btn.innerHTML = capitalizedName;
    btn.type = "button";
    btn.name = "load" + capitalizedName;
    btn.id = "load" + capitalizedName;
    if (document.getElementById("load" + capitalizedName)) {
        return;
    }
    btn.style = "padding: 0% 2%;"
    btn.classList = "btn btn-light btn-sm";
    btn.addEventListener("click", function(){ loadPreset(name, lang); });
    document.getElementById("loadButtonGroup").appendChild(btn); 
    document.getElementById("loadButtonGroup").scrollLeft = document.getElementById("loadButtonGroup").scrollWidth;
}