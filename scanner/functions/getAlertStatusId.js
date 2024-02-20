function getAlertStatusId(statusName) {
    const status = alertStatusList.find((status) => status.status_name === statusName);
    return status ? status.status_id : undefined;
}