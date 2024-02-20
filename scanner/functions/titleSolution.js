function titleSolution(obj, parent) {
    let id = obj.id;
    parent.append(`
    <div class="row w-100 align-items-center">
        <div class="col-12">
            <small class="text-grey settings-title">${ i18n.__(id) }</small>
        </div>
    </div>
    <br />
    `);
}