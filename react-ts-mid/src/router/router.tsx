import { createHashRouter } from "react-router-dom";
import App from '../view/App';
import Add from "../view/Add";
import Find from "../view/Find";
import Update from "../view/Update";


export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/add",
        element: <Add />
      },
      {
        path: "/search",
        element: <Find />
      },
      {
        path: "/edit/:id",
        element: <Update />
      }
    ]
  }
]);