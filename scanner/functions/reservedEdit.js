function reservedEdit(index) {
    reservedArray[index].time = $("#reserved-time-" + index).val();
    reservedArray[index].plan = $("#dropdown-itemlist-" + index).attr("value");
    reservedArray[index].cycle = $("#reserved-cycle-" + index).val();

    let planInfo = store.get("predefined-tasks")[reservedArray[index].plan];
    let planTotalTime = (planInfo.workTime + planInfo.restTime) * planInfo.loops;
    let endTimeHourPart = Number(reservedArray[index].time.slice(0, 2)) + Math.floor(planTotalTime / 60);
    let endTimeMinutePart = Number(reservedArray[index].time.slice(3, 5)) + planTotalTime % 60;
    if (endTimeMinutePart >= 60) endTimeMinutePart -= 60, endTimeHourPart += 1;
    if (endTimeHourPart >= 24) endTimeHourPart = 24, endTimeMinutePart = 0;
    endTimeHourPart = endTimeHourPart.toString(), endTimeMinutePart = endTimeMinutePart.toString();
    if (endTimeHourPart.length < 2) endTimeHourPart = "0" + endTimeHourPart;
    if (endTimeMinutePart.length < 2) endTimeMinutePart = "0" + endTimeMinutePart;
    reservedArray[index].endTime = endTimeHourPart + ":" + endTimeMinutePart;

    store.set("reserved", reservedArray);
}