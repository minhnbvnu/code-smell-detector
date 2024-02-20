function dropdownTrigger(id, choiceId, choiceMsg, relaunch, after) {
    $('#dropdown-button-' + id).html(choiceMsg);
    store.set(id, choiceId);
    after(choiceId);//do after execution jobs
    if (relaunch) ipc.send("relaunch-dialog");
}