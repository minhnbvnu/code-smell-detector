function dropdownSolution(obj, parent) {
    let
        id = obj.id,
        def = obj.def,
        choices = obj.choices,
        tipped = (typeof (obj.tipped) == "undefined") ? true : obj.tipped,
        relaunch = (typeof (obj.relaunch) == "undefined") ? false : obj.relaunch,
        after = (typeof (obj.after) === "undefined") ? (function () {
        }) : obj.after;
    parent.append(`
        <div class="row w-100 align-items-center">
            <div class="col-8 text-left">
                <label>
                    ${ i18n.__(id) }
                </label>
                <p class="settings-msg${ tipped ? '' : ' d-none' }">
                    ${ tipped ? i18n.__(id + '-tip') : "" }
                </p>
            </div>
            <div class="col-4 text-right">
                <div class="dropdown d-inline">
                    <a aria-expanded="false" aria-haspopup="true"
                       class="btn btn-outline-secondary dropdown-toggle w-100 small" data-toggle="dropdown"
                       id="dropdown-button-${ id }">
                    </a>
                    <div aria-labelledby="dropdown-button-${ id }" class="dropdown-menu"
                         id="dropdown-${ id }">
                    </div>
                </div>
            </div>
        </div>
        <br/>
    `);
    for (let i in choices) {
        $('#dropdown-' + id).append(`
            <a class='dropdown-item' href="javascript:dropdownTrigger('${ id }',${ i }, '${ i18n.__('dropdown-' + choices[i]) }',${ relaunch },${ after })">
                ${ i18n.__('dropdown-' + choices[i]) }
            </a>
        `);
    }
    if (!store.has(id)) $('#dropdown-button-' + id).html(i18n.__('dropdown-' + choices[def]));
    else $('#dropdown-button-' + id).html(i18n.__('dropdown-' + choices[store.get(id)]));
}