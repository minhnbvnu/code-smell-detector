function endCurrentReportsBuffering() {
                const { upper, inExpressionNodes, reports } = reportsBuffer;
                if (upper) {
                    upper.inExpressionNodes.push(...inExpressionNodes);
                    upper.reports.push(...reports);
                }
                else {
                    // flush remaining reports
                    reports.forEach(({ finishReport }) => finishReport());
                }
                reportsBuffer = upper;
            }