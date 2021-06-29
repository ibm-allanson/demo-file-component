import './App.css';
import MultiFileInput from './MultiFileInput';

function App() {
  return (
    <div className="App">
      <MultiFileInput
        onChange={(a) => {
          console.log('onChanage!', a);
        }}
        quota={2}
      ></MultiFileInput>
    </div>
  );
}

export default App;
