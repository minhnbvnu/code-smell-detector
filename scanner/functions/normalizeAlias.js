function normalizeAlias(alias) {
	return typeof alias === "object" && !Array.isArray(alias) && alias !== null
		? Object.keys(alias).map(key => {
				/** @type {AliasOptionEntry} */
				const obj = { name: key, onlyModule: false, alias: alias[key] };

				if (/\$$/.test(key)) {
					obj.onlyModule = true;
					obj.name = key.slice(0, -1);
				}

				return obj;
		  })
		: /** @type {Array<AliasOptionEntry>} */ (alias) || [];
}