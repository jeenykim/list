import { createStore } from 'vuex'
import { initData } from '../constants'

const localData = JSON.parse(localStorage.getItem('todo'))// localStorage(윈내장)저장한 Data 현상태 유지
// usetodos에 선언한 todo값 할당지정
//직접 전달 못하기에 useTodos통해 전달

export default createStore({
  state: { // data 가 들어가는 곳
    //state는 Vuex 저장소의 루트 상태 객체이다. 
    // 여기에 상태를 추가한다.
    // state는 쉽게 말하면 프로젝트에서 공통으로 사용할 변수를 정의 
// 프로젝트 내의 모든 곳에서 참조 및 사용이 가능
// state를 통해 각 컴포넌트에서 동일한 값을 사용할 수 있다.

    todos: localData || initData// initData데이터 상수는 constants폴더로 관리
    // localStorage저장한 할일Data 가져오고 아니면 초기상수데이터 가져온다
    // useTodos에서 선언한 todos값 지정
  },
  mutations: { // 여기서 data 를 업데이트
    // Vuex 저장소에서 실제로 상태를 변경하는 유일한 방법은 변이(mutation)하는 것이다. 
    // mutations 객체에 핸들러 함수를 정의한다.
    // mutations 를 통해서 state 를 변경시키는 역활을 한다
    // (Mutations을 통해서만 state를 변경해야 함)
    // 여기서 함수를 정의하고 함수 안에 state 로 접근해서 state 를 변경한다.
    // store mutations 에서 메소드들을 추가  
// 비동기 처리가 아니라 동기처리
// 위의 함수가 실행되고 종료된 후 그 다음 아래의 함수가 실행
// commit('함수명', '전달인자')으로 실행 시킬 수 있다.
// mutations 내에 함수 형태로 작성한다.
    SET_TODO(state, payload) { // 첫번째 인자로 state(현상태) 를 가져온다. 이로인해 state 로 접근하고 전송
      // 두번째 전달할 값
      state.todos = [...state.todos, payload]// 현상태 모든것 추가하고 전송
      localStorage.setItem('todo', JSON.stringify(state.todos))// 할일 입력 저장하고 문자열로 반환(JSON.stringify)한다
    },
    DELETE_TODO(state, payload) {//지우기
      const index = state.todos.findIndex(todo => todo.id === payload)
      // callback(element, index, array) → 콜백함수가 받는 인자(각 인자는 findIndex 메서드를 호출한 배열에서 받아옴)
      // 원하는 요소의 식별자 찾기
      // 원하는 요소를 찾자마자 메서드를 종료함
      /// / id 값을 가진 index 를 가져와서 지운다.
      state.todos.splice(index, 1)// splice통해 삭제
      localStorage.setItem('todo', JSON.stringify(state.todos))
    },
    CHANGE_TODO(state, payload) {
      // 체크여부에 따라 x버튼 출현
      const id = payload.id
      // usetodos에 선언한 id값 할당전송보냄
      const index = state.todos.findIndex(todo => todo.id === id)// 현재 id 값을 가진 index 를 가져와서
      state.todos[index] = payload// 해당 id상태를 반전시킨다
      localStorage.setItem('todo', JSON.stringify(state.todos))
    }
  },
  actions: { // 메소드가 들어가는 곳
    // Actions의 주요 목적은 Mutations를 실행시키는 역활
    // Mutations이 실행되면 state도 변경된다
// 상태를 바로 변경하지 않고 어떤 처리를 한 다음에 상태를 변경해야하는 경우가 있을 수 있는데 동기 처리가 아니라 비동기처리
// action은 dispatch()를 사용하여 호출한다.
// 순서에 상관없이 먼저 종료된 함수의 피드백을 받아 후속 처리를 하게 된다.
// dispatch('함수명', '전달인자')으로 실행 시킬 수 있다. 
// ex) dispatch('함수명', '전달인자', {root:true})
// actions 내에 함수 형태로 작성
// 비동기 처리이기 때문에 콜백함수로 주로 작성
    ADD_TODO({ commit }, payload) { // 상단 해당기능 작동됨
      commit('SET_TODO', payload)// SET_TODO는 ADD_TODO에 포함
    },
    REMOVE_TODO({ commit }, payload) {
      commit('DELETE_TODO', payload)// DELETE_TODO는 REMOVE_TODO에 포함
    }
  },
  getters: {
    todos: state => state.todos/// / computed 같은 개념 바뀐 새로운 값의 현 상태 데이터 받음
    //첫번째 전달 인자로 상태를 받는다.
    //받은 상태를 현상태로 변환
    // 각 Components의 계산된 속성(computed)의 공통 사용 정의
// 여러 Components에서 동일한 computed가 사용 될 경우 Getters에 정의하여 공통으로 쉽게 사용할 수 있다.

  },
  modules: {
  }
})

// 각각 컴포넌트 (dispatch)--> actions (commit)--> mutations (state)--> state -->모든 컴포넌트에서 활용