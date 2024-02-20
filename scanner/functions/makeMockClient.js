function makeMockClient(delay = 1000) {
      if (delay < 1000) {
        // see comments below to understand why.
        throw new Error(
          "Whoa boy, this requires at least as second's length of time to work right",
        );
      }
      const sleep = (ms) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(), ms);
        });
      };
      const ops = [];
      return {
        ...noOpClientMethods(),
        ops,
        addOp(data) {
          this.ops.push({ data, time: new Date() });
        },
        opDelay: delay, // second delay added to ops
        getOpConcurrency() {
          //  This is a super clever (see: stupid) way to test the concurrency of the requests.
          //  I use the second value of time that the operation was made to then group and count requests.
          //  Assuming a second is enough granularity (enforced at the top) it should count how many operations
          //  were ran within the same second. This can then be used to determine how many were concurrently
          //  called at once.
          let opSecondCount = {};
          let opOrder = [];
          for (let i = 0; i < this.ops.length; i++) {
            let { data, time } = this.ops[i];
            let second = time.getSeconds();
            if (opSecondCount[second] === undefined) {
              opSecondCount[second] = 0;
              opOrder.push(second);
            }
            opSecondCount[second]++;
          }
          return opOrder.map((second) => opSecondCount[second]);
        },
        batchWrite(params) {
          let delay = this.opDelay;
          this.addOp({ params, type: "batchWrite" });
          return {
            async promise() {
              await sleep(delay);
              return {
                UnprocessedItems: {
                  electro: [
                    {
                      DeleteRequest: {
                        Key: {
                          pk: "$bugbeater#sector_a1",
                          sk: "$test_entity_1#id_abc",
                        },
                      },
                    },
                  ],
                },
                ConsumedCapacity: [
                  {
                    TableName: "electro",
                    CapacityUnits: 3,
                  },
                ],
              };
            },
          };
        },
        batchGet(params) {
          let delay = this.opDelay;
          this.addOp({ params, type: "batchGet" });
          return {
            async promise() {
              await sleep(delay);
              return {
                Responses: {
                  electro: [
                    {
                      gsi1sk: "b_buildingz#u_g1#s_lattelarrys",
                      gsi2sk: "l_2020-01-20#s_lattelarrys#b_buildingz#u_g1",
                      mallId: "WashingtonSquare",
                      gsi3sk:
                        "$test_entity_1#category_food/coffee#building_buildingz#unit_g1#store_lattelarrys",
                      gsi1pk: "mall_washingtonsquare",
                      gsi4sk:
                        "$test_entity_1#mall_washingtonsquare#building_buildingz#unit_g1",
                      __edb_e__: "TEST_ENTITY",
                      storeId: "LatteLarrys",
                      rent: "0.00",
                      buildingId: "BuildingZ",
                      sk: "$test_entity_1#id_f41148a7-ff78-45fd-a027-84b2424cac21",
                      gsi2pk: "m_washingtonsquare",
                      unitId: "G1",
                      gsi3pk: "$bugbeater#mall_washingtonsquare",
                      gsi4pk: "$bugbeater#store_lattelarrys",
                      __edb_v__: "1",
                      pk: "$bugbeater#sector_a1",
                      category: "food/coffee",
                      leaseEnd: "2020-01-20",
                      sector: "A1",
                      storeLocationId: "f41148a7-ff78-45fd-a027-84b2424cac21",
                    },
                  ],
                },
                UnprocessedKeys: {},
              };
            },
          };
        },
      };
    }