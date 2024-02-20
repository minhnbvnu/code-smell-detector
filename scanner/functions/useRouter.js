function useRouter() {
	const ctx = useContext(RouterContext);
	// Note: this condition can't change without a remount, so it's a safe conditional hook call
	if (ctx === GLOBAL_ROUTE_CONTEXT) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const update = useState()[1];
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			SUBS.push(update);
			return () => SUBS.splice(SUBS.indexOf(update), 1);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);
	}
	return [ctx, route];
}