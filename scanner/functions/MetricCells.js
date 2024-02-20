function MetricCells({ metrics }) {
    const { classForPercent, pct, covered, missed, total } = metrics;

    return (
        <>
            <td className={'pct ' + classForPercent}>{Math.round(pct)}% </td>
            <td className={classForPercent}>
                <div className="bar">
                    <div
                        className={`bar__data ${classForPercent} ${classForPercent}--dark`}
                        style={{ width: pct + '%' }}
                    ></div>
                </div>
            </td>
            <td className={'abs ' + classForPercent}>{covered}</td>
            <td className={'abs ' + classForPercent}>{missed}</td>
            <td className={'abs ' + classForPercent}>{total}</td>
        </>
    );
}