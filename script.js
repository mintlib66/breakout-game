const rules_btn = document.querySelector('#rules-btn')
const close_btn = document.querySelector('#close-btn')
const rules = document.querySelector('#rules')

rules_btn.addEventListener('click', () => {
  rules.classList.add('show')
})
close_btn.addEventListener('click', () => {
  rules.classList.remove('show')
})

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
