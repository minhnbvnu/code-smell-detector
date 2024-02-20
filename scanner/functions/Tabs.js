function Tabs({ selected, setSelected }) {
  return (
    <div className={styles.tabsContainer} id="tabs">
      <nav className={styles.tabs}>
        <button
          onClick={() => setSelected('webpack')}
          className={[
            selected === 'webpack' ? styles.selectedTab : null,
            styles.tab,
          ].join(' ')}
        >
          <div className={styles.tabImage}>
            <Image
              alt="webpack logo"
              src={selected === 'webpack' ? webpackImgColor : webpackImg}
              width={40}
              height={40}
            />
          </div>
          <div className={styles.tabsDescription}>webpack</div>
        </button>
        <button
          onClick={() => setSelected('parcel')}
          className={[
            selected === 'parcel' ? styles.selectedTab : null,
            styles.tab,
          ].join(' ')}
        >
          <div className={styles.tabImage} style={{ marginTop: '0px' }}>
            <Image
              alt="parcel logo"
              src={selected === 'parcel' ? parcelImgColor : parcelImg}
              width={35}
              height={35}
            />
          </div>
          <div className={styles.tabsDescription}>Parcel</div>
        </button>

        <button
          onClick={() => setSelected('snowpack')}
          className={[
            selected === 'snowpack' ? styles.selectedTab : null,
            styles.tab,
          ].join(' ')}
        >
          <div className={styles.tabWrapper}>
            <div className={styles.tabImage}>
              <Image
                alt="snowpack logo"
                src={selected === 'snowpack' ? snowpackImgColor : snowpackImg}
                width={22}
                height={22}
              />
            </div>
            <div
              className={styles.tabsDescription}
              style={{ marginTop: '4px' }}
            >
              Snowpack
            </div>
          </div>
        </button>
      </nav>
    </div>
  );
}