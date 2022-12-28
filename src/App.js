import { Toaster } from 'react-hot-toast';
import './App.css';
import RoomUpload from './component/RoomUpload';

function App() {
  return (
    <div>
      <RoomUpload></RoomUpload>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
