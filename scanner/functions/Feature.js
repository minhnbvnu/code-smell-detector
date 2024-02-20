function Feature({Svg, title, description, link}) {
  return (
      <div className={clsx('col col--4')}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <h3><a href={link}>{title}</a></h3>
          <p>{description}</p>
        </div>
      </div>
  );
}