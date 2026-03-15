import "./App.css";
import AppRoutes from "./appRoutes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="app-container">
          <AppRoutes />
        </div>
      </Provider>
    </>
  );
}

export default App;
