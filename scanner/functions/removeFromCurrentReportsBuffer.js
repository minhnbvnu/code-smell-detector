function removeFromCurrentReportsBuffer(node) {
                reportsBuffer.reports = reportsBuffer.reports.filter(r => r.node !== node);
            }