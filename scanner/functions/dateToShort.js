function dateToShort(dateId){
    const data = split(dateId);
    const {month} = data;
    const {year} = data;

    return `${month}/${year.substring(0,1)}`;
}