async function fetchModulesOptionsIoc() {
    const response = get_request_api('/dim/hooks/options/ioc/list');

    return await response;
}