async function getCommandOutputFromContainer(imageTagOrContainerName, command, forceRoot, userName) {
    const runArgs = isContainerName(imageTagOrContainerName) ?
        ['exec'].concat( userName ? ['-u', userName] : forceRoot ? ['-u', 'root'] : [])
        : ['run','--init', '--privileged', '--rm'].concat(forceRoot ? ['-u', 'root'] : []);
    const wrappedCommand = `bash -c "set -e && echo ~~~BEGIN~~~ && ${command} && echo && echo ~~~END~~~"`;
    runArgs.push(imageTagOrContainerName);
    runArgs.push(wrappedCommand);
    const result = await asyncUtils.spawn('docker', runArgs, { shell: true, stdio: 'pipe' });
    // Filter out noise from ENTRYPOINT output
    const filteredResult = result.substring(result.indexOf('~~~BEGIN~~~') + 11, result.indexOf('~~~END~~~'));
    return filteredResult.trim();
}