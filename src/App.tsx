import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { increment, decrement } from "./redux/counter/counterSlice";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h2>My Current Count = {count}</h2>
      <div style={{ marginTop: "8px" }}>
        <button onClick={() => dispatch(decrement())}>Increase -1</button>
        <button onClick={() => dispatch(increment())}>Increase +1</button>
      </div>
    </>
  );
}

export default App;
