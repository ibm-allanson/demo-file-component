import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import MultiFileInput from './MultiFileInput';

function sleeper(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

const useUploadFile = () => {
  const [response, setResponse] = useState(null);
  const mountedRef = useRef(true);

  const uploadFile = useCallback(async (file) => {
    await sleeper(Math.floor(Math.random() * 500) + 1000);
    if (mountedRef.current) {
      setResponse({
        name: file.name,
        created: `${Date.now()}`,
        id: 'http://placekitten.com/50/50'
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return [response, uploadFile];
};

function App() {
  return (
    <div className="App">
      <MultiFileInput
        onChange={(fileIds) => {
          console.log('Updated fileIds', fileIds);
        }}
        quota={2}
        useUploadFile={useUploadFile}
      ></MultiFileInput>
    </div>
  );
}

export default App;
