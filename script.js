const rules_btn = document.querySelector('#rules-btn')
const close_btn = document.querySelector('#close-btn')
const rules = document.querySelector('#rules')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio
let scoreValue = 0

//캔버스 해상도 비율 조정
canvas.width = 800
canvas.height = 600
ctx.scale(dpr, dpr)

//요소 정보
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4, //기본은 떨어지는 방향
  color: '#a8c4ee',
}
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 40,
  width: 80,
  height: 10,
  speed: 8,
  dx: 0,
  color: '#000',
}
const score = {
  x: canvas.width - 100,
  y: 40,
  font: '20px Arial',
  text: `점수: ${scoreValue}`,
  color: '#000',
}

//그리기 함수
function draw() {
  drawBall()
  drawPaddle()
  drawScore()
}

function drawBall() {
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI)
  ctx.fillStyle = ball.color
  ctx.fill()
  ctx.closePath()
}
function drawPaddle() {
  ctx.beginPath()
  ctx.fillStyle = paddle.color
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
  ctx.closePath()
}
function drawScore() {
  ctx.beginPath()
  ctx.font = score.font
  ctx.fillText(score.text, score.x, score.y)
  ctx.closePath()
}

//이벤트 리스너
rules_btn.addEventListener('click', () => {
  rules.classList.add('show')
})
close_btn.addEventListener('click', () => {
  rules.classList.remove('show')
})

draw()

/* 
1. 캔버스 컨텍스트 생성
2. 공 만들고 그리기
3. 막대기 만들고 그리기
4. 벽돌 만들고 그리기
5. 점수판 그리기 
6. update() 함수 추가 (애니메이션 표현, 그림 업데이트) - requestAnimationFrame(callback)
7. 막대기 움직임 구현
8. 키보드 이벤트핸들러 연결
9. 공 움직임 구현
10. 벽 경계 추가
11. 벽돌 깨면 점수 증가 표현
12. 죽었을때 화면 리셋 표현 
*/
