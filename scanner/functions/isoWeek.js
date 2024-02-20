function isoWeek(date) {
            var nyd, nyy, week;
            nyy = date.getUTCFullYear();
            nyd = new Date(Date.UTC(nyy, 0)).getUTCDay();
            week = weekOfYear(date, 1) + (nyd > 1 && nyd <= 4 ? 1 : 0);
            if (!week) {
                nyy = date.getUTCFullYear() - 1;
                nyd = new Date(Date.UTC(nyy, 0)).getUTCDay();
                week = nyd == 4 || (nyd == 3 && new Date(nyy, 1, 29).getDate() == 29) ? 53 : 52;
                return [week, date.getUTCFullYear() - 1];
            }
            else if (week == 53 && !(nyd == 4 || (nyd == 3 && new Date(nyy, 1, 29).getDate() == 29))) {
                return [1, date.getUTCFullYear() + 1];
            }
            else {
                return [week, date.getUTCFullYear()];
            }
        }