function renderInfosTest(expected, message, current, rowCount, total)
{
    // given
    var instance = {
            element: $("#table").data(namespace, {
                header: header,
                footer: footer
            }),
            options: {
                navigation: 1,
                css: {
                    infos: "infos"
                },
                templates: {
                    infos: "<div class=\"infos\">{{ctx.start}}{{ctx.end}}{{ctx.total}}</div>"
                }
            },
            current: current,
            rowCount: rowCount,
            total: total,
            header: $("#header"),
            footer: $("#footer")
        };

    // when
    renderInfos.call(instance);

    // then
    var infos = instance.header.find(".infos").text();
    equal(infos, expected, message);
}