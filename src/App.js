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
        created: Date.now(),
        id: `https://picsum.photos/50/50?grayscale&random=${
          Math.floor(Math.random() * 500) + 1
        }`
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
        quota={10}
        useUploadFile={useUploadFile}
        onChange={(fileIds) => {
          console.log('Updated fileIds', fileIds);
        }}
        onError={(errMsg) => {
          alert(`${errMsg.title} NEWLINE ${errMsg.text}`);
        }}
      ></MultiFileInput>
    </div>
  );
}

export default App;
