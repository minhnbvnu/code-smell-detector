function fetchSimilarAlerts(alert_id,
  refresh = false,
  fetch_open_alerts = true,
  fetch_closed_alerts = false,
  fetch_open_cases = false,
  fetch_closed_cases = false
    ) {
      const similarAlertsElement = $(`#similarAlerts-${alert_id}`);
      if (!similarAlertsElement.html() || refresh) {
        // Build the query string with the new parameters
        const nb_nodes = $(`#nbResultsGraphFilter-${alert_id}`).val();
        const queryString = new URLSearchParams({
          'open-alerts': fetch_open_alerts,
          'closed-alerts': fetch_closed_alerts,
          'open-cases': fetch_open_cases,
          'closed-cases': fetch_closed_cases,
          'days-back': $(`#daysBackGraphFilter-${alert_id}`).val(),
          'number-of-nodes': nb_nodes
        }).toString();

        $(`#similarAlertsNotify-${alert_id}`).text('Fetching relationships...');
        get_raw_request_api(`/alerts/similarities/${alert_id}?${queryString}&cid=${get_caseid()}`)
          .done((data) => {
            createNetwork(alert_id, data.data, nb_nodes, `similarAlerts-${alert_id}`, `graphConfigure-${alert_id}`);
          });
      }
}