import Header from "./components/header";
import TabsContent from "./components/tabs.content";
import "./App.css";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
      </div>
      <div className="app-content">
        <TabsContent />
      </div>
    </>
  );
}

export default App;
