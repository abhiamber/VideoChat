import "./App.css";
import Notification from "./components/Notification";
import Option from "./components/Option";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <VideoPlayer />
      <Option>
        <Notification />
      </Option>
    </div>
  );
}

export default App;
