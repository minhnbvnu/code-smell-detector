function deleteChaosProgramButton(name) {
    let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById("loadButtonGroup").removeChild(document.getElementById("load" + capitalizedName)); 
}