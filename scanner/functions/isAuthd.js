function isAuthd(request, env) {
	const authz = request.headers.get('Authorization');
	const secret = env.BEARER_TOKEN;
	if (secret === undefined || authz === null) {
		return false;
	}
	const want = `Bearer ${secret}`;

	const enc = new TextEncoder();
	const authzBuffer = enc.encode(authz);
	const wantBuffer = enc.encode(want);
	if (authzBuffer.length != wantBuffer.length) {
		return false;
	}
	return crypto.subtle.timingSafeEqual(authzBuffer, wantBuffer);
}