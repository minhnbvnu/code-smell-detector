function StatusMetric({ data, name }) {
    return (
        <div className="toolbar__item">
            <span className="strong">{data.pct}%</span>{' '}
            <span className="quiet">{name}</span>{' '}
            <span className={'fraction ' + data.classForPercent}>
                {data.covered}/{data.total}
            </span>
        </div>
    );
}