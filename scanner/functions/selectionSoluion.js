function selectionSoluion(obj, parent, inner) {
    let
        id = obj.id,
        def = (typeof (obj.def) == "undefined") ? false : obj.def,
        tipped = (typeof (obj.tipped) == "undefined") ? true : obj.tipped,
        relaunch = (typeof (obj.relaunch) == "undefined") ? false : obj.relaunch,
        after = (typeof (obj.after) === "undefined") ? (function () {
        }) : obj.after;
    if (process.platform !== "darwin" && id === "dock-hide") return;//for Win and Linux, don't show this section
    if (process.platform === "darwin" && id === "force-screen-lock-mode") return;//for macOS, don't show this section
    parent.append(`
        <div class="row w-100 align-items-center">
            <div class="col-${ inner ? 8 : 9 } text-left">
                <label>
                    ${ i18n.__(id) }
                </label>
                <br/>
                <p class="settings-msg${ tipped ? '' : ' d-none' }" id="msg-${ id }">
                    ${ tipped ? i18n.__(id + '-tip') : "" }
                </p>
            </div>
            <div class="col-${ inner ? 4 : 3 } text-right">
                <label class="switch-slide">
                    <input type="checkbox" id="selection-${ id }" hidden>
                    <label for="selection-${ id }" class="switch-slide-label"></label>
                </label>
            </div>
        </div>
        <br/>
    `);
    let selection = $('#selection-' + id);
    if ((def && !store.has(id)) || store.get(id) === true)
        selection.prop("checked", true);
    if (!tipped) $('#msg-' + id).remove();
    selection.on("click", function () {
        store.set(id, $('#selection-' + id).prop("checked"));
        after($('#selection-' + id).prop("checked"));//do after execution jobs
        if (relaunch) ipc.send("relaunch-dialog");
    });
}