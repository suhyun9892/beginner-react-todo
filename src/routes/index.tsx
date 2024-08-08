import { createBrowserRouter } from 'react-router-dom'
import Main from './Main'
import TodoItemDetails from './TodoItemDetails'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: ':todoId',
        element: <TodoItemDetails />
      }
    ]
  }
])
