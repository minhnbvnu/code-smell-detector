function getDateString() {
    var d = new Date();

    return ("" + d.getFullYear() + "-" + slice2(d.getMonth() + 1) +
            "-" + slice2(d.getDate()) + " " + slice2(d.getHours()) + ":" +
            slice2(d.getMinutes()) + ":" + slice2(d.getSeconds()));
}