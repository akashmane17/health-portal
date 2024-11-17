import { useMyContext } from "./app/Context";
import Routes from "./routes/Routes";
import { Toaster } from "react-hot-toast";

function App() {
  const { appLoading } = useMyContext();
  return appLoading ? (
    <h1>LOADING...</h1>
  ) : (
    <>
      <Routes />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default App;
