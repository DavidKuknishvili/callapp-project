import ReactDOM from "react-dom/client";
import App from "./App";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import PieChart from "./PieChart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route index={true} element={<App />}></Route>
        <Route path="pie" element={<PieChart />}></Route>
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);
