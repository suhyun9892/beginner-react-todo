import { create } from 'zustand' // create 함수
import { combine } from 'zustand/middleware' // combine 함수

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
      // never아니고 Todos이라고 타입을 지정해줘야 함. 추론이 안되는 것만 단언해주면 됨.
      todos: [] as Todos,
      message: '',
      loading: true
    },
    // get = data를 가져오는 함수, set = data를 변경하는 함수
    function (set) {
      async function getTodos() {
        // updateTodo() --> 일반함수는 호이스팅이 가능하기 때문에 이렇게 사용할 수 있다.
        try {
          const res = await fetch(
            'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
            {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                apikey: 'KDT9_AHMq2s7n',
                username: 'FE1_ParkSuHyun'
              }
            }
          )
          const data = await res.json()
          console.log('응답결과: ', data)
          // setTodos(data)
          // 상태를 갱신하는 함수
          set({
            // 위쪽의 todos
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
          await fetch(
            `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${updatedTodo.id}`,
            {
              method: 'PUT',
              headers: {
                'content-type': 'application/json',
                apikey: 'KDT9_AHMq2s7n',
                username: 'FE1_ParkSuHyun'
              },
              body: JSON.stringify({
                title: updatedTodo.title,
                done: updatedTodo.done
              })
            }
          )
          getTodos()
        } catch (error) {
          console.error(error)
        }
      }

      async function deleteTodo(deletedTodo: Todo) {
        await fetch(
          `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${deletedTodo.id}`, //:todoId
          {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              apikey: 'KDT9_AHMq2s7n',
              username: 'FE1_ParkSuHyun'
            }
          }
        )
        getTodos()
      }

      return {
        getTodos,
        updateTodo,
        deleteTodo
      }
    }
  )
)

//  1.
// set ({
//   상태이름: 새로운 값
// })

//  2.
// set (() => {})
// set((state) => {})
// set((state) => { return {
// 상태이름: 새로운 값
// }})

// const state = get()
// @ts-ignore
// state.getTodos()

//@ts-ignore
// await get().getTodos()
// promise 인스턴스를 반환하는 함수에만 await를 사용할 수 있다.
