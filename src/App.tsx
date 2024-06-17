import Header from "./components/header";
import TabsContent from "./components/tabs.content";
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

      {/* <hr />
      <div>Current Counter = {count.value}</div>
      <div>
        <button onClick={() => dispatch(decrement())}>Decrease -1</button>
        <button onClick={() => dispatch(increment())}>Increase +1</button>
      </div>

      <hr />
      <div>Current User = {user.listUsers}</div>
      <div>
        <button onClick={() => dispatch(godown())}>GoDown -10</button>
        <button onClick={() => dispatch(goup())}>GoUp +10</button>
      </div> */}
    </>
  );
}

export default App;
