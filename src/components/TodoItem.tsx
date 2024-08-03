import { useState } from 'react'
import type { Todo } from '../App'

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
          apikey: '5X8Z1k7M2vU5Q',
          username: 'Grepp_KDT4_ParkYoungWoong'
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
          apikey: '5X8Z1k7M2vU5Q',
          username: 'Grepp_KDT4_ParkYoungWoong'
        }
      }
    )
    deleteTodo(todo)
  }

  return (
    <li>
      {todo.title}
      <input
        value={title}
        onChange={e => setTItle(e.target.value)}
        onKeyDown={keydownHandler}
      />
      <button onClick={deleteItem()}>삭제</button>
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
