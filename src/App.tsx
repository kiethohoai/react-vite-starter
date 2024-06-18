import Header from "./components/Header";
import TabsContent from "./components/TableContent";
import "./App.css";
import { useAppSelector, useAppDispatch } from "./hooks";
// import { decrement, increment } from "./redux/counter/counterSlice";
// import { goup, godown } from "./redux/user/userSlice";

function App() {
  const count = useAppSelector((state) => state.counter);
  // console.log("🚀CHECK  count =", count);
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  // console.log("🚀CHECK  user =", user);

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
