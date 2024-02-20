function MarketsTable({ markets }) {
  const { formatter: numberFormatter, parser: numberParser } = useMemo(() => {
    return utils.createIntlNumberFormatter('en-US');
  }, []);

  const { formatter: currencyFormatter, parser: currencyParser } = useMemo(
    () => {
      return utils.createIntlNumberFormatter('en-US', {
        style: 'currency',
        currency: 'USD'
      });
    },
    []
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Market</th>
          <th>Supply</th>
          <th>Demand</th>
          <th>Cost</th>
          <th>Price</th>
          <th>Margin</th>
        </tr>
      </thead>
      <tbody>
        {markets.map(market => (
          <tr key={market.market}>
            <Scope scope={market.market}>
              <Cell name="market" data={market.market} readOnly />
              <Cell
                name="supply"
                data={market.supply}
                type="number"
                formatter={numberFormatter}
                parser={numberParser}
              />
              <Cell
                name="demand"
                data={market.demand}
                formula={calculateDemand}
                evaluateWhen={['price']}
                type="number"
                step="1000"
                formatter={numberFormatter}
                parser={numberParser}
              />
              <Cell
                name="cost"
                data={market.cost}
                type="number"
                step="1000"
                formatter={currencyFormatter}
                parser={currencyParser}
              />
              <Cell
                name="price"
                data={market.price}
                formula={calculatePrice}
                evaluateWhen={['margin', 'cost']}
                type="number"
                step="1000"
                native
                formatter={currencyFormatter}
                parser={currencyParser}
              />
              <Cell
                name="margin"
                data={market.margin}
                formula={calculateMargin}
                evaluateWhen={['price']}
                type="number"
                step="0.1"
                native
                formatter={currencyFormatter}
                parser={currencyParser}
              />
            </Scope>
          </tr>
        ))}
      </tbody>
    </table>
  );
}