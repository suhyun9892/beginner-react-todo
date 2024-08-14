import styles from './TodoItemModal.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useTodosStore } from '@/stores/todos'
import { useState } from 'react'

export default function TodoItemModal() {
  const navigate = useNavigate() // 훅 꺼내서 사용할게
  const { todoId } = useParams() // index.tsx에서 설정한 :todoId를 가져온다
  const todos = useTodosStore(state => state.todos) // 배열
  const deleteTodo = useTodosStore(state => state.deleteTodo)
  const updateTodo = useTodosStore(state => state.updateTodo)
  const currentTodo = todos.find(todo => todo.id === todoId) // 지금 id랑 주소창에 있는 id랑 같은 todo를 찾아서 가져온다
  const [title, setTitle] = useState(currentTodo?.title || '')
  const [done, setDone] = useState(currentTodo?.done || false)

  function offModal() {
    navigate('/') // 메인 페이지로 이동
  }

  function deleteCurrentTodo() {
    if (currentTodo) {
      deleteTodo(currentTodo)
      offModal()
    }
  }

  function updateCurrentTodo() {
    if (currentTodo) {
      updateTodo({
        ...currentTodo,
        title
      })
    }
  }

  return (
    <div className={styles.modal}>
      <div
        className={styles.overlay}
        onClick={offModal}></div>
      <div className={styles.contents}>
        <div>{currentTodo?.title}</div>
        <div>{currentTodo?.createdAt}</div>
        <input
          type="checkbox"
          checked={done}
          onChange={e => {
            setDone(e.target.checked)
            if (currentTodo) {
              updateTodo({
                ...currentTodo,
                done: e.target.checked
              })
            }
          }}
        />
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <button onClick={updateCurrentTodo}>수정</button>
        <button onClick={deleteCurrentTodo}>삭제</button>
      </div>
    </div>
  )
}
