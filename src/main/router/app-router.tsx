import { createBrowserRouter } from "react-router-dom";
import Login from "../../app/pages/login/login";
import { makeAuthUseCase } from "../factories/usecase/make-auth-usecase";
import { makeCookieAuth } from "../factories/make-cookie";
import Home from "../../app/pages/home/home";
import { makeLoadTool } from "../factories/usecase/make-load-tool-usecase";
import Tool from "../../app/pages/tool/tool";
import { makeDeleteTool } from "../factories/usecase/make-delete-tool-usecase";
import { makeSaveTool } from "../factories/usecase/make-save-usecase";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Login authentication={makeAuthUseCase()} 
      cookies={makeCookieAuth()} />
    ),
  },
  {
    path: "/home/tools",
    element: (
      <Home
        getTools={makeLoadTool()}
        deleteTool={makeDeleteTool()}
        cookies={makeCookieAuth()}
      />
    ),
  },
  {
    path: "/home/tools/save",
    element: (
      <Tool
        cookies={makeCookieAuth()}
        saveTool={makeSaveTool()}
      />
    ),
  },
]);

export default router;
