async function _getNpmVersion () {
    return (await execa('npm', ['-v'])).stdout;
}