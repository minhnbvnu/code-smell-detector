async function getLinuxDistroInfo(imageTagOrContainerName) {
    const info = {};
    const osInfoCommandOutput = await getCommandOutputFromContainer(imageTagOrContainerName, 'cat /etc/os-release', true);
    const osInfoLines = osInfoCommandOutput.split('\n');
    osInfoLines.forEach((infoLine) => {
        const infoLineParts = infoLine.split('=');
        if (infoLineParts.length === 2) {
            const propName = snakeCaseToCamelCase(infoLineParts[0].trim());
            info[propName] = infoLineParts[1].replace(/"/g,'').trim();    
        }
    })
    return info;
}