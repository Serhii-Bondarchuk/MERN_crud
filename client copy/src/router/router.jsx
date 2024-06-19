import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UsersTable from "../component/users/Users";
import AddUser from "../component/addUser/AddUser";
import UpdateUser from "../component/updateUser/UpdateUser";

const route = createBrowserRouter(
  [
    {
      path: '/',
      element: <UsersTable />
    },
    {
      path: '/add',
      element: <AddUser />
    },
    {
      path: '/update/:id',
      element: <UpdateUser />
    }
  ]
)

export const Router = ({ children }) => {
  return <RouterProvider router={route} >
    {children}
  </RouterProvider>
}
