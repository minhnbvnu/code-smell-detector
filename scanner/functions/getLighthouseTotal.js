function getLighthouseTotal(entry) {
	return entry.lighthouse.performance * 100 +
		entry.lighthouse.accessibility * 100 +
		entry.lighthouse.bestPractices * 100 +
		entry.lighthouse.seo * 100;
}