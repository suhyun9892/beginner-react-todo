import { useState } from 'react'

export default function TodoCreator({ getTodos }: { getTodos: () => void }) {
  // getTodos 함수를 받아올건데, 걔는 이렇게 생겼어
  const [title, setTitle] = useState('')
  // input 으로 들어오는 데이터를 가지고 있을 반응형 데이터가 필요

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      console.log('title:', title)
      createTodo() // 엔터키 누르면 함수 실행
    }
  }

  async function createTodo() {
    // const res = 필요없어서 지움 (밑에 res.json 안 쓰니까)
    await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos`, // todos/도 가능
      {
        method: 'POST', // 생성
        headers: {
          'content-type': 'application/json',
          apikey: 'KDT9_AHMq2s7n',
          username: 'FE1_ParkSuHyun'
        },
        body: JSON.stringify({
          title // title: title
        })
      }
    )
    // const newTodo: Todo = await res.json(). 서버에서 생성한 새로운 데이터가 응답으로 옴.
    // 서버에서 새로 가지고 온 추가된 todo를 쓰는게 아니라 새로 목록을 가지고 오는 방식이라 이 부분은 필요 없음
    getTodos()
    // todos.splice(0, 0, newTodo): 배열의 0번째 자리에 아무것도 지우지 말고 newTodo를 추가 (app.tsx 만들어서 가지고 오면 됨. 참고)
  }

  return (
    <div>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="새로운 할 일을 작성하세요"
      />
    </div>
  )
}
