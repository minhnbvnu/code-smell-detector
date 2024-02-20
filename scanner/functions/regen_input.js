function regen_input() {
    input = [];
    var len = 10;
    for (var i = 0; i < len; i++) {
        input.push(Math.floor(Math.random()*10));
    }

    el.input_data.innerHTML = stringify(input);
}