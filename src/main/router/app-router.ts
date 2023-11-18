import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: "<Login validation={undefined} authentication={undefined} />",
  },
  {
    path: "/tools",
    element: "<Tool addTool={undefined} />",
  },
]);

export default router;
