async function refreshAlert(alertId, alertData, expanded=false) {
    if (alertData === undefined) {
        const alertDataReq = await fetchAlert(alertId);
        if (!notify_auto_api(alertDataReq, true)) {
            return;
        }
        alertData = alertDataReq.data;
    }

      if (modulesOptionsAlertReq === null) {
    modulesOptionsAlertReq = await fetchModulesOptionsAlert();
    if (!notify_auto_api(modulesOptionsAlertReq, true)) {
        return;
    }
  }
  if (modulesOptionsIocReq === null) {
    modulesOptionsIocReq = await fetchModulesOptionsIoc();
    if (!notify_auto_api(modulesOptionsIocReq, true)) {
        return;
    }
  }

    const alertElement = $(`#alertCard-${alertId}`);
    const alertHtml = renderAlert(alertData, expanded, modulesOptionsAlertReq.data, modulesOptionsIocReq.data);
    alertElement.replaceWith(alertHtml);
}