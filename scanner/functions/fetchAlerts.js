async function fetchAlerts(page, per_page, filters_string = {}, sort_order= 'desc') {

    const response = get_raw_request_api(`/alerts/filter?cid=${get_caseid()}&page=${page}&per_page=${per_page}
  &sort=${sort_order}&${filters_string}`);

  return await response;

}