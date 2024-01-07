function isBrowser() {
	  return typeof window !== 'undefined' && window.document != null || //@ts-ignore
	  typeof WorkerGlobalScope !== 'undefined';
	}