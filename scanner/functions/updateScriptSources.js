async function updateScriptSources(devContainerDockerfileRaw, repo, release, updateScriptSha) {
    updateScriptSha = typeof updateScriptSha === 'undefined' ? true : updateScriptSha;
    let devContainerDockerfileModified = devContainerDockerfileRaw;

    const scriptArgs = /ARG\s+.+_SCRIPT_SOURCE/.exec(devContainerDockerfileRaw) || [];
    await asyncUtils.forEach(scriptArgs, async (scriptArg) => {
        // Replace script URL and generate SHA if applicable
        const scriptCaptureGroups = new RegExp(`${scriptArg}\\s*=\\s*"(.+)/${scriptLibraryPathInRepo.replace('.', '\\.')}/(.+)"`).exec(devContainerDockerfileModified);
        if (scriptCaptureGroups) {
            console.log(`(*) Script library source found.`);
            const scriptName = scriptCaptureGroups[2];
            const scriptSource = `https://raw.githubusercontent.com/${repo}/${release}/${scriptLibraryPathInRepo}/${scriptName}`;
            console.log(`    Updated script source URL: ${scriptSource}`);
            let sha = scriptSHA[scriptName];
            if (updateScriptSha && typeof sha === 'undefined') {
                const scriptRaw = await asyncUtils.getUrlAsString(scriptSource);
                sha = await asyncUtils.shaForString(scriptRaw);
                scriptSHA[scriptName] = sha;
            }
            console.log(`    Script SHA: ${sha}`);
            const shaArg = scriptArg.replace('_SOURCE', '_SHA');
            devContainerDockerfileModified = devContainerDockerfileModified
                .replace(new RegExp(`${scriptArg}\\s*=\\s*".+"`), `${scriptArg}="${scriptSource}"`)
                .replace(new RegExp(`${shaArg}\\s*=\\s*".+"`), `${shaArg}="${updateScriptSha ? sha : 'dev-mode'}"`);

        }
    })

    return devContainerDockerfileModified;
}