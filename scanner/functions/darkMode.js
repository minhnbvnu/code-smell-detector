function darkMode(btn) {
    var webpage = document.querySelector("body");
    var featureButton = document.querySelector("#featureButton");
    var status = btn.checked;
    var suggestions = document.querySelector(".reply-options");
    console.log(suggestions);

    if (status == true) {
        webpage.classList.add("dark");
        featureButton.style.color = "white";
        for (x of suggestions) {
            x.style.backgroundColor = '#056162';
        }
    } else {
        webpage.classList.remove("dark");
        featureButton.style.color = "black";
        for (x of suggestions) {
            x.style.backgroundColor = '#dcf8c6';
        }
    }
}