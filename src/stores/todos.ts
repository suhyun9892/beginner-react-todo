import axios from 'axios'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export type Todos = Todo[]
export interface Todo {
  id: string
  order: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}

// combine(상태객체, 액션함수)
export const useTodosStore = create(
  combine(
    {
      todos: [] as Todos,
      message: '',
      loading: true
    },
    function (set) {
      async function getTodos() {
        // updateTodo() --> 일반함수는 호이스팅이 가능하기 때문에 이렇게 사용할 수 있다.
        try {
          // 서버리스로 요청을 보내는 함수
          const { data } = await axios.post('/api/todos')
          console.log('응답결과: ', data)
          // setTodos(data)
          set({
            todos: data
          })
        } catch (error) {
          if (error instanceof Error) {
            const message = '서버가 폭팔했어요'
            console.error('에러..', message)
            // setMessage(message)
            set({
              message // message: message
            })
          }
        } finally {
          // setLoading(false)
          set({
            loading: false
          })
        }
      }

      async function updateTodo(updatedTodo: Todo) {
        try {
          await axios.post('/api/todos', {
            endpoint: updatedTodo.id,
            method: 'PUT',
            data: {
              title: updatedTodo.title,
              done: updatedTodo.done
            }
          })
          getTodos()
        } catch (error) {
          console.error(error)
        }
      }

      async function deleteTodo(deletedTodo: Todo) {
        await axios.post('/api/todos', {
          endpoint: deletedTodo.id,
          method: 'DELETE'
        })
        await getTodos()
      }

      return {
        getTodos,
        updateTodo,
        deleteTodo
      }
    }
  )
)

// const state = get()
// @ts-ignore
// state.getTodos()

//@ts-ignore
// await get().getTodos()
// promise 인스턴스를 반환하는 함수에만 await를 사용할 수 있다.
