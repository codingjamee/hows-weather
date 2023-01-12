import Contents from "./components/Contents";
import Head from "./components/Head";
import Foot from "./components/Foot";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Head />
      <Contents />
      <Foot />
    </div>
  );
}

export default App;
