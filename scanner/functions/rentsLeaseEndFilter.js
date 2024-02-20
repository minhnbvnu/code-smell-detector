function rentsLeaseEndFilter(
        { rent, leaseEnd, mall } = {},
        { lowRent, beginning, end, location } = {},
      ) {
        return `(${rent.gte(lowRent)} AND ${mall.eq(
          location,
        )}) OR ${leaseEnd.between(beginning, end)}`;
      }