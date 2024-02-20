function print_comment(comment) {
        var value = comment.value.replace(/[@#]__PURE__/g, " ");
        if (/^\s*$/.test(value) && !/^\s*$/.test(comment.value)) return false;
        if (/comment[134]/.test(comment.type)) {
            print("//" + value);
            need_newline_indented = true;
        } else if (comment.type == "comment2") {
            print("/*" + value + "*/");
        }
        return true;
    }