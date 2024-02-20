async function Stories({ storyIds, page = 1 }) {
  const limit = 30
  const offset = (page - 1) * limit

  return (
    <div>
      {storyIds.slice(offset, offset + limit).map((id, i) => (
        <div key={id} className={styles.item}>
          {null != offset ? (
            <span className={styles.count}>{i + offset + 1}</span>
          ) : null}
          <StoryWithData id={id} key={id} />
        </div>
      ))}
      <div className={styles.footer}>
        <Link href={`/news/${+page + 1}`}>More</Link>
      </div>
    </div>
  )
}