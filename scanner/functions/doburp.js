function doburp(type, level) {
    // console.log(type);
    var lists = toBurpinfo.getValue().split('\n');
    lists = uniqBy(lists);

    var methods_list = { methods_list: [] };
    for (var index = 0; index < lists.length; index++) {
        try {
            if ("" == lists[index]){
                continue;
            }
            var temp = JSON.parse(lists[index]);
            methods_list.methods_list.push(temp)
        } catch (e) {
            console.log("doburp is error: " + lists[index])
        }
    }
    if ("Android" == type) {
        methods_list["type"] = "Android";
    }else if ("IOS" == type) {
        methods_list["type"] = "IOS";
    }

    if (level == "normal"){
        socket.emit("doburp", methods_list);
    } else if (level == "update"){
        socket.emit("GeneratetoBurp", methods_list);
    }
}