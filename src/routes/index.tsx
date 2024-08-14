import { createBrowserRouter } from 'react-router-dom'
import Main from './Main'
import TodoItemDetails from './TodoItemDetails'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    // 메인 페이지가 보이는 상태에서 모달을 보여줄거니까 children으로 설정
    children: [
      {
        path: ':todoId',
        element: <TodoItemDetails />
      }
    ]
  }
])
