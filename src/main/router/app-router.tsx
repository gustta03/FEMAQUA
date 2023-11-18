import { createBrowserRouter } from "react-router-dom";
import Login from "../../app/pages/login/Login";
import { makeAuthUseCase } from "../factories/usecase/make-auth-usecase";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login authentication={makeAuthUseCase()} />, 
  },
]);

export default router;