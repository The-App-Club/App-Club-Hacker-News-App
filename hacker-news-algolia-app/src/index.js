import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const getInfo = ({ url }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url, {
          method: 'get',
        });
        resolve(await response.json());
      } catch (error) {
        reject(error);
      }
    });
  };

  const getFetchUrl = useCallback((query) => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, []);

  useEffect(() => {
    (async () => {
      const url = getFetchUrl('react');
      console.log(url);
      const resultInfo = await getInfo({ url });
      console.log(resultInfo);
    })();
  }, [getFetchUrl]);

  useEffect(() => {
    const url = getFetchUrl('ionic');
    console.log(url);
  }, [getFetchUrl]);

  return (
    <div>
      <h2>{'App'}</h2>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
