const numbers = [1, 2, 3, 4]

// 인덱스(색인)
// const b = numbers[0]
// const c = numbers[1]
// const d = numbers[2]

// 배열 구조 분해 할당
//    [1, 2, 3, 4]
const [b, c, d] = numbers

console.log(b) // 1
console.log(c) // 2
console.log(d) // 3

// 객체 구조 분해 할당

const users = {
  name: 'mike',
  age: 30
}
const { name } = users
console.log(name)

// 기본값 지정 가능
const { email = 'suhyun8667@naver.com' } = users
console.log(email)
// 이름 변경 가능
const { age: userAge } = users
console.log(userAge)
