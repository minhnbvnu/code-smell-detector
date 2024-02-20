function collapseSolution(obj, parent) {
    let
        id = obj.id,
        tipped = (typeof (obj.tipped) == "undefined") ? true : obj.tipped;
    parent.append(`
    <div class="row w-100 align-items-center">
            <div class="col-9 text-left">
                <label>
                    ${ i18n.__(id) }
                </label>
                <br />
                <p class="settings-msg">
                ${ tipped ? i18n.__(id + '-tip') : "" }
                </p>
            </div>
            <div class="col-3 text-right">
                <a class="btn btn-sm btn-outline-primary dropdown-toggle" data-toggle="collapse" href="#collapsed-${ id }" role="button"
                   aria-expanded="false" aria-controls="collapse-${ id }" id="collapse-toggle-${ id }">
                    ${ i18n.__("unfold") }
                </a>
            </div>
            <div class="collapse col-12 pt-2" id="collapsed-${ id }">
                <div class="card card-body" id="collapse-container-${ id }"></div>
            </div>
        </div>
        <br/>
    `);
    let collapseToggle = $("#collapse-toggle-" + id);
    collapseToggle.on('click', function () {
        if (collapseToggle.text().indexOf(i18n.__("unfold")) !== -1)
            collapseToggle.text(i18n.__("fold") + " ");
        else
            collapseToggle.text(i18n.__("unfold") + " ");
    })
    preferenceCreator(obj.inner, $("#collapse-container-" + id), true);
}