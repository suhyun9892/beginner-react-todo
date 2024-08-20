import { useState } from 'react'
import axios from 'axios'

export default function TodoCreator({ getTodos }: { getTodos: () => void }) {
  const [title, setTitle] = useState('')

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      console.log('title:', title)
      createTodo() // 엔터키 누르면 함수 실행
    }
  }

  async function createTodo() {
    await axios.post('/api/todos', {
      method: 'POST',
      data: {
        title
      }
    })
    getTodos()
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
