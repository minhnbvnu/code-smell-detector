function presentResultList(results) {
	const resultsByDay = _.groupBy(results, result => {
		return moment(result.date).format('YYYY-MM-DD');
	});
	const uniqueDayResults = [];
	_.keys(resultsByDay).forEach(day => {
		uniqueDayResults.push(resultsByDay[day][0]);
	});
	return uniqueDayResults;
}