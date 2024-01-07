function registerScript(script, name, app) {
    if (script.legacy) {
        Debug.error('This project is using the legacy script system. You cannot call pc.registerScript().');
        return;
    }

    if (typeof script !== 'function')
        throw new Error(`script class: '${script}' must be a constructor function (i.e. class).`);

    if (!(script.prototype instanceof ScriptType))
        throw new Error(`script class: '${ScriptType.__getScriptName(script)}' does not extend pc.ScriptType.`);

    name = name || script.__name || ScriptType.__getScriptName(script);

    if (reservedScriptNames.has(name))
        throw new Error(`script name: '${name}' is reserved, please change script name`);

    script.__name = name;

    // add to scripts registry
    const registry = app ? app.scripts : AppBase.getApplication().scripts;
    registry.add(script);

    ScriptTypes.push(script, script.legacy);
}