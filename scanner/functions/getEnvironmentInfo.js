async function getEnvironmentInfo () {
    const [npmVersion, osInfoResult] = await Promise.all([_getNpmVersion(), osInfo()]);
    const { platform, distro, release, codename, kernel, arch, build } = osInfoResult;

    const optionalBuildSuffix = build ? ` (${build})` : '';

    const osFormat = [
        platform === 'darwin' ? codename : distro,
        release + optionalBuildSuffix,
        `(${platform} ${kernel})`,
        `${arch}`
    ];

    return {
        key: 'Environment',
        children: [
            { key: 'OS', value: osFormat.join(' ') },
            { key: 'Node', value: process.version },
            { key: 'npm', value: npmVersion }
        ]
    };
}