function getAlertResolutionId(resolutionName) {
    if (alertResolutionList.length === undefined) {
        getAlertResolutionList();
    }
    const resolution = alertResolutionList.find((resolution) => resolution.resolution_status_name.toLowerCase().replaceAll(' ', '_') === resolutionName);
    return resolution ? resolution.resolution_status_id : undefined;
}