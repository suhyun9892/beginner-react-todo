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
  },
  server: {
    proxy: {
      // 로컬 서버에서 api로 시작하는 요청이 오면 http://localhost:3000으로 보내줘
      // /도 하나의 이름이라는 것을 보여주기 위해 ''로 묶어줌
      // /api로 시작하는 요청이 오면 http://localhost:3000으로 보내줘
      '/api': { target: 'http://localhost:3000' }
    }
  }
})
