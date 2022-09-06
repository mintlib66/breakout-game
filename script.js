//변수 선언
const rules_btn = document.querySelector('#rules-btn')
const close_btn = document.querySelector('#close-btn')
const rules = document.querySelector('#rules')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio

const brickRowCount = 9
const brickColumnCount = 5

let scoreValue = 0

//캔버스 해상도 비율 조정
canvas.width = 800
canvas.height = 600

//요소 정보
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: 10,
  speed: 4,
  dx: 4,
  dy: -4, //기본은 떨어지는 방향
  color: '#a8c4ee',
}
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 40,
  w: 80,
  h: 10,
  speed: 5,
  dx: 0,
  color: '#000',
}
const score = {
  x: canvas.width - 100,
  y: 40,
  font: '20px Arial',
  color: '#000',
}
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
}
const bricks = []
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = []
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
    bricks[i][j] = { x, y, ...brickInfo }
  }
}

//그리기 함수
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawBall()
  drawPaddle()
  drawScore()
  drawBricks()
}

function drawBall() {
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI)
  ctx.fillStyle = ball.color
  ctx.fill()
  ctx.closePath()
}
function drawPaddle() {
  ctx.beginPath()
  ctx.fillStyle = paddle.color
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h)
  ctx.closePath()
}
function drawScore() {
  ctx.beginPath()
  ctx.font = score.font
  ctx.fillText(`점수: ${scoreValue}`, score.x, score.y)
  ctx.closePath()
}
function drawBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath()
      ctx.fillStyle = brick.visible ? '#a8c4ee' : 'transparent'
      ctx.fillRect(brick.x, brick.y, brick.w, brick.h)
      ctx.closePath()
    })
  })
}

//요소 동작 함수
function moveBall() {
  ball.x += ball.dx
  ball.y += ball.dy

  //벽에 부딪히면(right, left)
  if (ball.x + ball.r > canvas.width || ball.x - ball.r < 0) {
    ball.dx *= -1
  } //top
  if (ball.y - ball.r < 0) {
    ball.dy *= -1
  }
  // if (ball.y + ball.r > canvas.height) {
  //   gameOver()
  // }

  //막대기에 부딪히면
  //top
  if (
    paddle.x < ball.x - ball.r &&
    paddle.x + paddle.w > ball.x + ball.r &&
    paddle.y > ball.y + ball.r
  ) {
    ball.dy *= -1
  }
  //bottom
  if (
    paddle.x < ball.x - ball.r &&
    paddle.x + paddle.w > ball.x + ball.r &&
    paddle.y + paddle.h > ball.y - ball.r
  ) {
    ball.dy *= -1
  }
  //left
  if (
    paddle.x < ball.x + ball.r &&
    paddle.y < ball.y + ball.r &&
    paddle.y + paddle.h > ball.y - ball.r
  ) {
    ball.dx *= -1
  }
  //right
  if (
    paddle.x + paddle.w > ball.x - ball.r &&
    paddle.y < ball.y + ball.r &&
    paddle.y + paddle.h > ball.y - ball.r
  ) {
    ball.dx *= -1
  }

  //블록에 부딪히면
  bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (
          brick.x < ball.x - ball.r &&
          brick.x + brick.w > ball.x + ball.r &&
          brick.y < ball.y + ball.r &&
          brick.y + brick.h > ball.y - ball.r
        ) {
          brick.visible = false
          ball.dy *= -1
          scoreValue++
        }
      }
    })
  })
}
function movePaddle() {
  paddle.x += paddle.dx
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w
  } else if (paddle.x < 0) {
    paddle.x = 0
  }
}

function update() {
  moveBall()
  movePaddle()

  draw()

  requestAnimationFrame(update)
}

//키보드 이벤트
function keyDownHandler(e) {
  if (e.key === 'ArrowLeft' || e.key === 'Left') {
    paddle.dx = -paddle.speed
  } else if (e.key === 'ArrowRight' || e.key === 'Right') {
    paddle.dx = paddle.speed
  }
  update()
}
function keyUpHandler(e) {
  if (
    e.key === 'ArrowLeft' ||
    e.key === 'Left' ||
    e.key === 'ArrowRight' ||
    e.key === 'Right'
  ) {
    paddle.dx = 0
    update()
  }
}

//이벤트 리스너
rules_btn.addEventListener('click', () => {
  rules.classList.add('show')
})
close_btn.addEventListener('click', () => {
  rules.classList.remove('show')
})
document.addEventListener('keydown', keyDownHandler)
document.addEventListener('keyup', keyUpHandler)

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
