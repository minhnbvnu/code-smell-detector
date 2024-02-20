function addinfo(){
    var select_result = $("#select_result option:selected").val();
    var select_text = $("#select_result option:selected").text();
    var pkg_class_method_name_code =  $("#pkg_class_method_name_code").text();
    var jsoninfo = JSON.parse(pkg_class_method_name_code);
    var jmethodname = jsoninfo.methodname;

    var methodarglength = JSON.parse(select_text).length;
    var methodtag = "tag" + jsoninfo.classtag + select_result + methodarglength;

    if (jmethodname === undefined) {
        var iosmethodname = JSON.parse(select_text).methodInfo;
        var hook_message = { "classname": jsoninfo.classname, "methodname": iosmethodname, "index": Number(select_result), "length":methodarglength, "methodtag": methodtag, "platform": "IOS"};
    }else{
        var hook_message = { "classname": jsoninfo.classname, "methodname": jmethodname, "index": Number(select_result), "length":methodarglength, "methodtag": methodtag, "platform": "Android"};
    }

    var val = toBurpinfo.getValue();
    if (val){
        toBurpinfo.setValue(val + '\n' + JSON.stringify(hook_message));
    }else {
        toBurpinfo.setValue(JSON.stringify(hook_message))
    }    
    // console.log(select_result + "::::"+select_text+":::"+methodarglength);
    // var methodtag = jmethodname + jsoninfo.classtag + select_result + methodarglength;
    // console.log(jsoninfo);
}