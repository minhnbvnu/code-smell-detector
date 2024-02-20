function EventPeriod(start, end, timezone) {
        this.pendingCnt = 0;
        this.freezeDepth = 0;
        this.stuntedReleaseCnt = 0;
        this.releaseCnt = 0;
        this.start = start;
        this.end = end;
        this.timezone = timezone;
        this.unzonedRange = new UnzonedRange_1.default(start.clone().stripZone(), end.clone().stripZone());
        this.requestsByUid = {};
        this.eventDefsByUid = {};
        this.eventDefsById = {};
        this.eventInstanceGroupsById = {};
    }