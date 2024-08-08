import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Todo } from '@/routes/Main'

export default function TodoItem({
  todo,
  setTodo,
  deleteTodo
}: {
  todo: Todo
  setTodo: (updatedTodo: Todo) => void
  deleteTodo: (todoToDelete: Todo) => void
}) {
  // return 키워드 없으면 void(return 키워드가 없다는 뜻. 있으면 그 데이터 써줘야 됨)
  // return undefined --> undefined 타입 !
  const [title, setTItle] = useState(todo.title)

  async function keydownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      updateTodo()
    }
  }

  async function updateTodo() {
    setTodo({
      ...todo,
      title: title
      // title은 수정된 그 title로 적용해줘, 속성과 변수 이름이 같으니 그냥 title로 축약할 수 있음
    })
    console.log('서버로 전송', title)
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          apikey: 'KDT9_AHMq2s7n',
          username: 'FE1_ParkSuHyun'
        },
        body: JSON.stringify({
          // 수정된 title
          title,
          done: todo.done
        })
      }
    )
    const updatedTodo: Todo = await res.json()
    console.log(updatedTodo, title)
    // setTodo(updatedTodo)
  }

  async function deleteItem() {
    await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`, //:todoId
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          apikey: 'KDT9_AHMq2s7n',
          username: 'FE1_ParkSuHyun'
        }
      }
    )
    deleteTodo(todo)
  }

  return (
    <li>
      <Link to={`/${todo.id}`}>{todo.title}</Link>
      <input
        value={title}
        onChange={e => setTItle(e.target.value)}
        onKeyDown={keydownHandler}
      />
      <button onClick={deleteItem}>삭제</button>
      {/* <button onClick={deleteItem()}>삭제</button> */}
      {/* 호출을 해버려서 바로 지워졌던 문제 !!! */}
    </li>
  )
}
