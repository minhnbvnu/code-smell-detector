function featureTestFormatter(formatter) {
        var passed = true;

        // Test minimumIntegerDigits.
        passed = passed && formatter(1, "en", { minimumIntegerDigits: 1 }) === "1";
        passed = passed && formatter(1, "en", { minimumIntegerDigits: 2 }) === "01";
        passed = passed && formatter(1, "en", { minimumIntegerDigits: 3 }) === "001";
        if (!passed) { return false; }

        // Test maximumFractionDigits and minimumFractionDigits.
        passed = passed && formatter(99.99, "en", { maximumFractionDigits: 0, minimumFractionDigits: 0 }) === "100";
        passed = passed && formatter(99.99, "en", { maximumFractionDigits: 1, minimumFractionDigits: 1 }) === "100.0";
        passed = passed && formatter(99.99, "en", { maximumFractionDigits: 2, minimumFractionDigits: 2 }) === "99.99";
        passed = passed && formatter(99.99, "en", { maximumFractionDigits: 3, minimumFractionDigits: 3 }) === "99.990";
        if (!passed) { return false; }

        // Test maximumSignificantDigits.
        passed = passed && formatter(99.99, "en", { maximumSignificantDigits: 1 }) === "100";
        passed = passed && formatter(99.99, "en", { maximumSignificantDigits: 2 }) === "100";
        passed = passed && formatter(99.99, "en", { maximumSignificantDigits: 3 }) === "100";
        passed = passed && formatter(99.99, "en", { maximumSignificantDigits: 4 }) === "99.99";
        passed = passed && formatter(99.99, "en", { maximumSignificantDigits: 5 }) === "99.99";
        if (!passed) { return false; }

        // Test grouping.
        passed = passed && formatter(1000, "en", { useGrouping: true }) === "1,000";
        passed = passed && formatter(1000, "en", { useGrouping: false }) === "1000";
        if (!passed) { return false; }

        return true;
    }