function metricsTemplate({ pct, covered, total }, kind) {
        return `
            <div class='fl pad1y space-right2'>
                <span class="strong">${pct}% </span>
                <span class="quiet">${kind}</span>
                <span class='fraction'>${covered}/${total}</span>
            </div>
        `;
    }