function TopLevelWrapperForDevTools({version}) {
  let header = <h1>React {version}</h1>;
  if (version.includes('canary')) {
    const commitSha = version.match(/.+canary-(.+)/)[1];
    header = (
      <h1>
        React canary{' '}
        <a href={`https://github.com/facebook/react/commit/${commitSha}`}>
          {commitSha}
        </a>
      </h1>
    );
  } else if (version.includes('alpha')) {
    header = <h1>React next</h1>;
  }

  return (
    <div>
      {header}
      {apps}
    </div>
  );
}