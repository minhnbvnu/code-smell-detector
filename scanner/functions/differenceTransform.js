function differenceTransform(interval, date1, date2, utc) {
                    interval = interval.replace(/s$/, "");
                    return round(differenceMap[interval](date1, date2, utc));
                }