import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 별명, 별칭 설정
    alias: [
      // @: 경로 중에 @을 발견하면 /src로 바꿔줘
      { find: '@', replacement: '/src' },
      // node_modules파일 보이면 /node_modules로 바꿔줘
      { find: 'node_modules', replacement: '/node_modules' }
    ]
  }
})
