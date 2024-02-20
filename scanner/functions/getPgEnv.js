function getPgEnv() {
	return {
		database: Deno.env.get('PGDATABASE'),
		hostname: Deno.env.get('PGHOST'),
		port: Deno.env.get('PGPORT'),
		user: Deno.env.get('PGUSER'),
		password: Deno.env.get('PGPASSWORD'),
		applicationName: Deno.env.get('PGAPPNAME'),
	};
}