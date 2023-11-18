import { createBrowserRouter } from "react-router-dom";
import Login from "../../app/pages/login/Login";
import { makeAuthUseCase } from "../factories/usecase/make-auth-usecase";
import { makeCookieAuth } from "../factories/make-cookie";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login authentication={makeAuthUseCase()} cookies={makeCookieAuth()} />, 
  },
]);

export default router;