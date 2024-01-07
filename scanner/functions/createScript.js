function createScript(name, app) {
    if (script.legacy) {
        Debug.error('This project is using the legacy script system. You cannot call pc.createScript().');
        return null;
    }

    if (reservedScriptNames.has(name))
        throw new Error(`Script name '${name}' is reserved, please rename the script`);

    const scriptType = function (args) {
        EventHandler.prototype.initEventHandler.call(this);
        ScriptType.prototype.initScriptType.call(this, args);
    };

    scriptType.prototype = Object.create(ScriptType.prototype);
    scriptType.prototype.constructor = scriptType;

    scriptType.extend = ScriptType.extend;
    scriptType.attributes = new ScriptAttributes(scriptType);

    registerScript(scriptType, name, app);
    return scriptType;
}