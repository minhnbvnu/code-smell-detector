async function getMyExternalIpAddress() {
    const response = await fetch("/clientinfo");
    const json = await response.json();
    return json.IPAddress;
}