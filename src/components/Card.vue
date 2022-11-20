<template>
  <!-- 체크박스toggleTodo, 리스트항목todo.title, x버튼구현deleteTodo-->
  <li class="Card">
      <span>
          <input class="checkbox" type="checkbox" :value="done" @click="toggleTodo" :checked="done">
          <!-- 기본값은 done 클릭하면 toggleTodo 체크하면 done -->
      </span>
      <span :class="{'done': done}" class="title">{{todo.title}}</span>
      <!-- :class는 하단선언한 done이 true라면 'done'클래스선언 -->
      <!-- done에는 하단 toggle와 delete 포함 -->
      <span v-if="done" @click="deleteTodo()" class="material-icons desc">
          X
      </span>
      <!-- v-if는 true/false나타내는 조건에 따라 렌더링 결정하는 디렉티브 -->
      <!-- v-if는 디렉티브를 사용한 엘리먼트의 이벤트 리스너와 자식 컴포넌트들이 제거되거나 삽입되는 렌더링 -->
      <!-- v-if는 조건이 참일 때만 html태그를 렌더링 -->
      <!-- 이벤트 정의 메서드에 정의한 deleteTodo()로직 실행 클릭되면 삭제됨 -->
      <!--디렉티브란 엘리먼트에게 이러이러하게 작동해라! 하고 지시를 해주는 지시문-->
  <!--엘리먼트란 내용을 포함해 시작태그와 종료태그까지-->
  </li>
</template>

<script>
import { computed } from 'vue'

export default {
name: 'Card',
props: { //상단으로 보내준다 
  todo: {
    type: Object, // // 오브젝트 타입 세팅
    // JavaScript에서 최상위 객체는 object
  // 타입을 object로 정의하면, any 타입처럼 모든 타입의 값을 할당할 수 있다.
    required: true // 무조건 항상 보내줘야한다는 거, 안보내주면 에러 뜸
  }
},

setup(props, context) { // 상단부모로부터 받은거, 지금내꺼 셋팅
  const done = computed(() => props.todo.done)
  return {
    done,
    // => 화살표 함수:함수 표현은 무명(anonymous:이름이 없음) 함수를 생성한 후 변수에 담는 방식
    // (파라메터1, 파라메터2,...) => { 함수내용 }
    // 단순하고 간결한 문법으로 함수를 만들 수 있다
    // 본문이 여러 줄로 구성되었다면 중괄호를 사용해야 한다.
    // 이 경우는 반드시 return 지시자를 사용해 반환 값을 명기해 주어야 한다.
    toggleTodo: () => {
      const value = {
        ...props.todo, // ...props의 모든 속성을 추출한다는 의미
        // 부모로부터받은것과
        done: !props.todo.done// 그 반대되는것을 받아서
      }
      context.emit('change', value)// 상단구조에 반환
    },
    deleteTodo: () => {
      context.emit('delete', props.todo.id)// 상단부모 컴포넌트로 보낼 변수명과 데이터를 인자로 넣어준다.
    }
  }
}
}
</script>

<style scoped>
</style>
