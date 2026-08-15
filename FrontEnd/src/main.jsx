import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/common.css"
import Navbar from './components/navbar.jsx'
import Listpost from './components/listpost.jsx'
import Children from './components/children.jsx'
import Post from "./components/post.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {AuthProvider} from "./components/authContext.jsx"
import PostCreate from "./components/addPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true, element: <Listpost />
      },
      {
        path: ":page", element: <Children />,
      },
      {
        path: "/posts/:postId", element: <Post />,
      },
      {
        path: "/posts/:postId/edit", element: <PostCreate />,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
