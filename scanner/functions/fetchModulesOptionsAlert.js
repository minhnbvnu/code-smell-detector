async function fetchModulesOptionsAlert() {
    const response = get_request_api('/dim/hooks/options/alert/list');

    return await response;
}