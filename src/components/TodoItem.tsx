import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Todo } from '@/stores/todos'
import { useTodosStore } from '@/stores/todos'

export default function TodoItem({ todo }: { todo: Todo }) {
  const [title, setTItle] = useState(todo.title)
  const updateTodo = useTodosStore(state => state.updateTodo)
  const deleteTodo = useTodosStore(state => state.deleteTodo)
  const [done, setDone] = useState(todo.done)

  useEffect(() => {
    setTItle(todo.title)
    setDone(todo.done)
  }, [todo])
  // 의존성 배열, todo 객체가 변경되는 것에 의존해서 useEffect가 실행된다.
  // todo가 변경될 때마다 title을 변경해준다.

  async function keydownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      updateTodo({
        ...todo,
        title
      })
      // 기존 todo의 title을 새로운 title로 변경
    }
  }

  return (
    <li>
      <Link to={`/${todo.id}`}>{todo.title}</Link>
      <input
        type="checkbox"
        checked={done}
        onChange={e => {
          setDone(e.target.checked)
          updateTodo({
            ...todo,
            done: e.target.checked
          })
        }}
      />
      <input
        value={title}
        onChange={e => setTItle(e.target.value)}
        onKeyDown={keydownHandler}
      />
      <button onClick={() => deleteTodo(todo)}>삭제</button>
      {/* <button onClick={deleteItem()}>삭제</button> */}
      {/* 호출을 해버려서 바로 지워졌던 문제 !!! */}
    </li>
  )
}
