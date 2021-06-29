import './App.css';
import MultiFileInput from './MultiFileInput';

function App() {
  return (
    <div className="App">
      <MultiFileInput
        onChange={(fileIds) => {
          console.log('Updated fileIds', fileIds);
        }}
        quota={2}
      ></MultiFileInput>
    </div>
  );
}

export default App;
