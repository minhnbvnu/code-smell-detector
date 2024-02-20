function loadColors(primaryClassName, secondaryClassName1, secondaryClassName2, secondaryClassNameN) {
    var secondaryClassNames = [].slice.call(arguments, 1);
    return secondaryClassNames.reduce(function(map, name) {
        var div = $("<div>").css("display", "none").addClass(primaryClassName).addClass(name);
        div.appendTo(document.body);

        map[name] = div.css("color");

        div.remove();

        return map;
    }, {});
}