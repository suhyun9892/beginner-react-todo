import { useEffect, Fragment } from 'react'
import { Outlet } from 'react-router-dom'
// 하위 페이지를 어디다가 출력할지 지정하는 컴포넌트
import TheLoader from '@/components/TheLoader'
import TodoItem from '@/components/TodoItem'
import TodoCreator from '@/components/TodoCreator'
import { useTodosStore } from '@/stores/todos'

export default function App() {
  // const 상태 = useTodosStore(function (스토어-state) {return 스토어.상태})
  const todos = useTodosStore(state => state.todos)
  const message = useTodosStore(state => state.message)
  const loading = useTodosStore(state => state.loading)
  const getTodos = useTodosStore(state => state.getTodos)

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <TodoCreator getTodos={getTodos} />
      <div>{loading && <TheLoader />}</div>
      <div>{message}</div>
      <ul>
        {todos.map(todo => (
          <Fragment key={todo.id}>
            <TodoItem todo={todo} />
          </Fragment>
        ))}
      </ul>
      <Outlet />
    </>
  )
}
