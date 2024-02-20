function calcYear(yr) {
        return Math.max(ICAL.Timezone._minimumExpansionYear, yr) +
               ICAL.Timezone.EXTRA_COVERAGE;
    }