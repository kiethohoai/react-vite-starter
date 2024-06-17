import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { increment, decrement } from "./redux/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

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
        <button className="btn btn-outline-success" onClick={() => dispatch(decrement())}>
          Increase -1
        </button>
        <button className="btn btn-outline-danger" onClick={() => dispatch(increment())}>
          Increase +1
        </button>
      </div>
    </>
  );
}

export default App;
