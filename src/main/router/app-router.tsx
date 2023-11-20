import { createBrowserRouter } from "react-router-dom";
import Login from "../../app/pages/login/login";
import { makeAuthUseCase } from "../factories/usecase/make-auth-usecase";
import { makeCookieAuth } from "../factories/make-cookie";
import Home from "../../app/pages/home/home";
import { makeLoadTool } from "../factories/usecase/make-load-tool-usecase";
import Tool from "../../app/pages/tool/tool";
import { makeDeleteTool } from "../factories/usecase/make-delete-tool-usecase";
import { makeSaveTool } from "../factories/usecase/make-save-usecase";
import PrivateRoute from "./private-route/PrivateRouter";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Login authentication={makeAuthUseCase()} cookies={makeCookieAuth()} />
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home
          getTools={makeLoadTool()}
          deleteTool={makeDeleteTool()}
          cookies={makeCookieAuth()}
        />
      </PrivateRoute>
    ),
  },
  {
    path: "/home/tools/save",
    element: (
      <PrivateRoute>
        <Tool cookies={makeCookieAuth()} saveTool={makeSaveTool()} />
      </PrivateRoute>
    ),
  },
]);

export default router;
