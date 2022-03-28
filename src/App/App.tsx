import React from 'react';
import AppRouting from './AppRouting';

// NOTE: a library should be used in a real-world scenario
const useFetchData = (): [string?, Error?] => {
  const [data, setData] = React.useState<string>();
  const [err, setErr] = React.useState<Error>();

  React.useEffect(() => {
    async function fetchData() {
      const ignorefile = await fetch('/.gitignore');
      const text = await ignorefile.text();

      setData(text);
    }
    fetchData().catch((err) => {
      setErr(err);
    });
  }, []);

  return [data, err];
};

const App: React.VFC = () => {
  const [, err] = useFetchData();

  if (err) {
    return (
      <div>
        <span style={{ background: 'red' }}>ERROR:</span>
        {err.message}
      </div>
    );
  }

  return <AppRouting />;
};

export default App;
