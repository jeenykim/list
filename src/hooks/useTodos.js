import store from '../store'//store 객체의 인스턴스를 가져온다.
import { ref, computed } from 'vue'
// Hooks를 사용하여 컨테이너 컴포넌트 만들기
// 컴포넌트를 생성하여 마운트하고, 불필요한 엘리먼트를 제거하는 일련의 과정을 생명주기라고 한다.
// Vue는 각 생명주기를 Hooking 할 수 있는 방법을 제공하는데 이를 LifeCycle Hook 이라고 한다.
// Options API를 사용할 경우, 각 LifeCycle은 지정된 옵션 함수를 정의하여 Hooking 할 수 있다.

// computed
// 복잡한 연산을 사용할 때 computed 속성을 사용한다.
// computed 속성을 사용했을 때 장점은 유지보수와 성능개선이다.
// methods 에서 넣어 동일하게 사용할 수도 있지만, 매소드에서 사용할 경우 사용하는 개수 만큼 함수를 호출해줘야하기 때문에 많은 데이터를 처리할 때 성능문제가 발생한다.
// computed 는 계산 결과를 저장하고 있기 때문에 여러 번 요청을 해도 계산을 다시 하지 않고 이미 계산되어 있던 결과를 즉시 반환한다.
// 상태값이 변경될 때마다 반응적으로 화면에 출력하려면 계산 필드로 만들어야 한다.
export default function useTodos() {
  const newTodo = ref('')
  // 동일한 이름의 ref 값을 컨텍스트에 노출시키면 Vue 내부에서 참조 가능하도록 값을 할당한다.
  // 내부에 값가지면서 반응적이고 변경가능한 ref객체 반환
  // 새로운 항목 계속 바뀜
  // ref는 단하나의 프로퍼티가지는데 내부값을 가리키는 value()
  const todos = computed(() => store.getters.todos)// todos를 store컴포넌트의.getters로 현상태의 리스트로 받아옴
  const addTodo = () => {
    const value = newTodo.value && newTodo.value.trim()// 새로운 값 newTodo.value 확인
    //문자열 좌우에서 공백을 제거하는 함수가 trim() 함수
    if (!value) {
      return
    }// 기존 동일한 입력값이 아니면 새로운 할일 생성
    const id = (todos.value.length && todos.value[todos.value.length - 1].id + 1) || 0
    // id는 AUTO INCREMENT(오토인크리먼트)사용 위함
    // 데이터추가되면 1씩 자동증가
    // todos 에 새로운 아이템이 들어갈 때는 항상 마지막에 들어가기 때문에, 마지막 인덱스 번째의 id를 기준으로 반응적으로 계산되게 했다.
    // 아이템을 모두 삭제하는 경우에는 옵셔널 체이닝을 이용해 0부터 다시 인덱싱이 되게 했다.

    const payload = {//전송 속성들 선언
      id: id,
      title: value,
      done: false// Card뷰에 done선언한 속성이 false
      // 체크버튼  x없음
    }// value선언하고 store의 ADD_TODO에서 가져온 현상태값 할당
    store.dispatch('ADD_TODO', payload)
     // store의 action은 dispatch()를 사용하여 호출한다.
    newTodo.value = ''// 값 할당위해 초기화
  }
  const changeTodo = (todo) => {
    store.commit('CHANGE_TODO', todo)// store에서 가져옴,관리는 store에서 함
    // Vue 컴포넌트에서 store 핸들러 함수를 사용하려면 commit()를 이용한다. 
    // 첫번째 파라미터는 핸들러 함수의 타입이고 두번째는 전달할 값이다.
  }
  const removeTodo = (id) => {
    store.dispatch('REMOVE_TODO', id)
    // store의 action은 dispatch()를 사용하여 호출한다.
  }
  return {
    addTodo,
    newTodo,
    changeTodo,
    removeTodo,
    todos
  }
}
