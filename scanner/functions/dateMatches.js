function dateMatches(dateId){
    const data = split(dateId);

    const today = (new Date());
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return data.month === month && data.year === year; 
}