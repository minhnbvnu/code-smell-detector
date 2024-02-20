function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title} </h1> 
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="./docs/Process/how-to-apply">
            Apply
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="./docs/rfps"
            style={{
              marginLeft: "20px"
            }}>
            Browse RFPs
          </Link>
        </div>
      </div>
    </header>
  );
}