import { useState, useEffect, Fragment } from 'react'
import TheLoader from './components/TheLoader'
import TodoItem from './components/TodoItem'

export type Todos = Todo[]
export interface Todo {
  id: string
  order: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}

export default function App() {
  const [todos, setTodos] = useState<Todos>([]) //초기값 빈 배열. user타입의 객체데이터가 들어가야 한다(타이핑. 명시적으로)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTodos()
  }, [])

  async function getTodos() {
    // 최상위레벨이 아니고 App 안으로 들어가야 하는 구조, export 사용 불가
    try {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            apikey: '5X8Z1k7M2vU5Q',
            username: 'Grepp_KDT4_ParkYoungWoong'
          }
        }
      )
      const data = await res.json()
      console.log('응답결과: ', data)
      setTodos(data)
    } catch (error) {
      if (error instanceof Error) {
        const message = '서버가 폭팔했어요'
        console.error('에러..', message)
        setMessage(message)
      }
    } finally {
      setLoading(false)
    }
  }

  function setTodo(updatedTodo: Todo) {
    // const [todos, setTodos] = useState<Todos>([]) 여기에서의 todos임
    setTodos(todos => {
      return todos.map(todo => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo
        }
        return todo
      })
    })
  }

  function deleteTodo() {
    // todos를 수정할 수 있는 유일한 함수 !
    setTodos(todos => {
      // todos에서 삭제할 todo를 제외한 나머지 todo들을 반환
      return todos.filter(todo => todo.id !== 'todo.id')
    })
  }

  return (
    <>
      <div>{loading && <TheLoader />}</div>
      <div>{message}</div>
      <ul>
        {todos.map(todo => (
          <Fragment key={todo.id}>
            <TodoItem
              todo={todo}
              setTodo={setTodo}
              deleteTodo={deleteTodo}
            />
          </Fragment>
        ))}
      </ul>
    </>
  )
}
