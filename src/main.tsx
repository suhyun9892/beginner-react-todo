import ReactDOM from 'react-dom/client'
import { router } from './routes' // index라는 이름을 가지고 있으면 생략 가능. routes/index
import { RouterProvider } from 'react-router-dom' // 컴포넌트임

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} /> // react-router로 페이지가 관리 된다 !
)
