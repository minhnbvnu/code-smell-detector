function viewAlertGraph() {
    const node_id = $("#view-alert").data('node-id');
    const node_type = $("#view-alert").data('node-type');

    if (node_type === 'alert') {
        window.open(`/alerts?alert_ids=${node_id}&cid=${get_caseid()}`);
    } else if (node_type === 'case') {
        window.open(`/case?cid=${node_id}`);
    } else if (node_type === 'asset') {
        window.open(`/alerts?alert_assets=${node_id}&cid=${get_caseid()}`);
    } else if (node_type === 'ioc') {
        window.open(`/alerts?alert_iocs=${node_id}&cid=${get_caseid()}`);
    }
}