function ParcelCourse() {
  return (
    <Layout title="Free Parcel course">
      <div className={styles.webpackConfigContainer}>
        <h1 className={styles.large}>Free Parcel course - coming soon</h1>
        <p>
          I am working on creating a free Parcel email course. Sign up below and
          I'll let you know when it's done. In the meantime I'll send you new
          articles I write, and exclusive offers for products I create, and some
          free goodies
        </p>
        <GenericSignupForm />
      </div>
    </Layout>
  );
}