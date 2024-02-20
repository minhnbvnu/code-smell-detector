function renderOption(builder, option, obj, cValue) {
        if (!obj) {
            builder.push(
                "<input type='checkbox' title='", option, "' ",
                    cValue + "" == "true" ? "checked='true'" : "",
               "'></input>"
            );
            return;
        }
        builder.push("<select title='" + option + "'>");
        for (var value in obj) {
            builder.push("<option value='" + value + "' ");

            if (cValue == value) {
                builder.push(" selected ");
            }

            builder.push(">",
                obj[value],
                "</option>");
        }
        builder.push("</select>");
    }