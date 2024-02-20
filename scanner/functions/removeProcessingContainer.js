async function removeProcessingContainer(containerName) {
    await asyncUtils.spawn('docker', ['rm', '-f', containerName], { shell: true, stdio: 'inherit' });
}