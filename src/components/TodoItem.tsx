import { useState } from 'react'
import type { Todo } from '../App'

export default function TodoItem({
  todo,
  getTodos
}: {
  todo: Todo
  getTodos: () => void
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
    console.log('서버로 전송', title)
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          apikey: '5X8Z1k7M2vU5Q',
          username: 'Grepp_KDT4_ParkYoungWoong'
        },
        body: JSON.stringify({
          title,
          done: todo.done
        })
      }
    )
    const data = await res.json()
    console.log(data, title)
    // 새로운 목록을 호출하는 방법
    getTodos()
  }
  //

  async function deleteTodo() {
    await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`, //:todoId
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          apikey: '5X8Z1k7M2vU5Q',
          username: 'Grepp_KDT4_ParkYoungWoong'
        }
      }
    )
  }

  return (
    <li>
      {todo.title}
      <input
        value={title}
        onChange={e => setTItle(e.target.value)}
        onKeyDown={keydownHandler}
      />
      <button onClick={deleteTodo}>삭제</button>
    </li>
  )
}

// function a(x:number, y:number) {
//   return x + y
// }
// function UserItem(props: {todo: User}) { //props는 객체데이터. todo는 User 타입
//   const todo = props.todo
//   const {todo} = props // 구조분해할당
// }

// export default function UserItem(props) {
//   1)const todo = props.todo
//   2) const { todo } = props // 객체구조분해할당
//   return (
//     <li key={todo.title}>
//       {todo.title}
//       <input
//         value={}
//         onChange={}
//       />
//     </li>
//   )
// }
