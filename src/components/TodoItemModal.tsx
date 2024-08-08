import styles from './TodoItemModal.module.css'
import { useNavigate, useParams } from 'react-router-dom'

export default function TodoItemModal() {
  const navigate = useNavigate() // 훅 꺼내서 사용할게
  const { todoId } = useParams() // index.tsx에서 설정한 :todoId를 가져온다
  function offModal() {
    navigate('/')
  }

  return (
    <div className={styles.modal}>
      <div
        className={styles.overlay}
        onClick={offModal}></div>
      <div className={styles.contents}>
        <h2>hello world</h2>
        <h3>Todo ID: {todoId}</h3>
      </div>
    </div>
  )
}
