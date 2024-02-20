async function startContainerForProcessing(imageTag) {
    const containerName = `vscdc--extract--${Date.now()}`;
    await asyncUtils.spawn('docker', ['run', '-d', '--rm', '--init', '--privileged', '--name', containerName, imageTag, 'sh -c "while sleep 1000; do :; done"'], { shell: true, stdio: 'inherit' });
    return containerName;
}