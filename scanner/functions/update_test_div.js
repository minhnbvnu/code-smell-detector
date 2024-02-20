function update_test_div() {
        const body = document.getElementsByTagName("body")[0];
        const col = document.getElementsByClassName("bokeh-test-div");
        if (col.length == 1) {
            body.removeChild(col[0]);
            delete col[0];
        }
        const box = document.createElement("div");
        box.classList.add("bokeh-test-div");
        box.style.display = "none";
        body.insertBefore(box, body.firstChild);
    }