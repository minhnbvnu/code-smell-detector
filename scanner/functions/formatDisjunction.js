function formatDisjunction(alternatives) {
            return map(alternatives, formatAlternative).join(" || ") || "*";
        }