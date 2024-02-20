async function fetchModulesOptionsAsset() {
    const response = get_request_api('/dim/hooks/options/asset/list');

    return await response;
}