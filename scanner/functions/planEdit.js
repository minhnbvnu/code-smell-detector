function planEdit(index) {
    defaultArray[index].name = $("#title" + index).val();
    if (!isNaN(Number($("#work-time" + index).val())) && Number($("#work-time" + index).val()) >= 0.083) defaultArray[index].workTime = $("#work-time" + index).val();
    else $("#work-time" + index).val(defaultArray[index].workTime);
    if (!isNaN(Number($("#rest-time" + index).val())) && Number($("#rest-time" + index).val()) >= 0.083) defaultArray[index].restTime = $("#rest-time" + index).val();
    else $("#rest-time" + index).val(defaultArray[index].restTime);
    if (!isNaN(Number($("#loops" + index).val())) && Number($("#loops" + index).val()) >= 1) defaultArray[index].loops = $("#loops" + index).val();
    else $("#loops" + index).val(defaultArray[index].loops);
    defaultArray[index].focusWhenWorking = !!document.getElementById("focus-when-working" + index).checked;
    defaultArray[index].focusWhenResting = !!document.getElementById("focus-when-resting" + index).checked;
    store.set("predefined-tasks", defaultArray);
}