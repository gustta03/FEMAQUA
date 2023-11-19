import { createBrowserRouter } from "react-router-dom";
import Login from "../../app/pages/login/Login";
import { makeAuthUseCase } from "../factories/usecase/make-auth-usecase";
import { makeCookieAuth } from "../factories/make-cookie";
import Tool from "../../app/pages/tools/tools";
import { makeLoadTool } from "../factories/usecase/make-load-tool-usecase";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login authentication={makeAuthUseCase()} cookies={makeCookieAuth()} />, 
  },
  {
    path: '/home/tools',
    element: <Tool loadAllTool={makeLoadTool()} cookies={makeCookieAuth()} />, 
  },
]);

export default router;