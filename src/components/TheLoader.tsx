import styles from './TheLoader.module.css'

export default function TheLoader() {
  return <div className={styles.theLoader}></div>
}

// 로딩 애니매이션을 컴포넌트화 시킬 수 있다
// 다른 곳에서 또 쓰면 됨
// 컴포넌트 = 재사용 가능한 UI 덩어리(조각)
// App.tsx 도 재사용 가능하지만 최상위 컴포넌트라서 하지 않는 것 뿐
