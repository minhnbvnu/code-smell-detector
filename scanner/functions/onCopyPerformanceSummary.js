function onCopyPerformanceSummary() {
    let summary = `Framerate ${debugFrameRateDisplay.textContent} ${debugFramePeriodDisplay.textContent}; `;
    summary += `${debugFrameTimeDisplay.textContent} Total = ${debugCPUTimeDisplay.textContent} CPU + ${debugGPUTimeDisplay.textContent} GPU + ${debugPPUTimeDisplay.textContent} Phys + ${debugBrowserTimeDisplay.textContent} ${browserName}`;
    navigator.clipboard.writeText(summary);
}