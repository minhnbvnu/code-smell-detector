function dateToReadble(t, dateId){
    const data = split(dateId);
    const {month} = data;
    const {year} = data;

    let readableMonth = "";
    switch(month){
        case "1":
            readableMonth = t("January");
            break;
        case "2":
            readableMonth = t("February");
            break;
        case "3":
            readableMonth = t("March");
            break;
        case "4":
            readableMonth = t("April");
            break;
        case "5":
            readableMonth = t("May");
            break;
        case "6":
            readableMonth = t("June");
            break;
        case "7":
            readableMonth = t("July");
            break;
        case "8":
            readableMonth = t("August");
            break;
        case "9":
            readableMonth = t("September");
            break;
        case "10":
            readableMonth = t("October");
            break;
        case "11":
            readableMonth = t("November");
            break;
        case "12":
            readableMonth = t("December");
            break;
        default:
            break;
    }

    return `${readableMonth} '${year.substring(2)}`;
}