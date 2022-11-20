<template>
    <div class="todo">
    <p class="header-day">{{today}}</p>
    <!-- utils의 getDate를 하단에서 today로 선언  -->
    <div class="input-box">
      <input type="text" v-model="newTodo" v-on:keyup.enter="addTodo">
    </div>
    <!-- v-model 디렉티브를 통해 input 태그에서 입력된 값이 Vue 인스턴스 안의 useTodos의 newTodo와 동기화시킴 (양방향 데이터 바인딩 생성) -->
      <!-- newTodo와 input 태그가 양방향 바인딩 되어있는 것을 활용하여 사이클릥 userTodos의 newTodo연동 -->

     <!-- useTodos의 methods에 선언한 addTodo 함수 연동 -->  
<!-- input 내 새로 입력된 값이면 todo 리스트에 추가하도록 코드 구현 -->

<!-- input 태그 내 v-on:keyup.enter 을 사용하여, 엔터키를 눌렀을 때, 이벤트가 발생하게 지정 -->
<!-- enter / tab / delete 등을 keyup. 이하에 붙일 수 있으며, keycode(숫자)로도 표현이 가능함 -->
<!-- 또는 button 태그와 마우스 클릭을 이용하여 이벤트가 발생하게도 지정할 수 있음. -->

    <p class="title-desc">{{todos.length}}개 홧팅!!</p>
     <!-- useTodos의 todos(전체리스트).개수가져옴 -->

    <ul>
      <Card v-for="todo in todos" :key="todo.id" :todo="todo" @delete="removeTodo" @change="changeTodo" />   
</ul>
 <!-- v-for 디렉티브를 사용해 배열기반 리스트 렌더링 -->
      <!--v-for 블록 안에는 부모 범위 속성에 대한 모든 권한이 있고-->
        <!-- Card.vue의 선언한 속성을 리스트에 적용 -->
        <!-- Card.vue의 하단 @delete와 @change의 
        deleteTodo와 toggleTodo를 
        useTodos의 removeTodo와 changeTodo로 지정-->

        <!-- 현재 항목의 인덱스에 대한 전달인자 옵션을 제공 --> 
<!-- 데이터 항목의 순서가 변경된 경우 항목의 순서와 일치하도록 DOM요소를 이동하는 대신  -->
<!-- Vue는 각 요소를 적절한 위치에 패치하고 해당 인덱스에서 렌더링할 내용을 반영하는지 확인함 -->
<!-- 이때 재정렬 할 수 있도록 각 항목에 고유속성 key를 제공해야 함 -->
  <!--v-for디렉티브는 vue데이터 속성 todos의 내용개수만큼 반복 출력 -->
   <!--v-for디렉티브 사용할때 key필수지정
    목록 변할시에 전체 움직이지않고 내부적 순서만 재조정하여 돔이동 최소화하여
    변하는 항목만 재조정-->
</div>

</template>

<script>
import Card from '../components/Card'
import { getDate } from '../utils'
import useTodos from '../hooks/useTodos'

export default {
  name: 'Todo',
  components: {
    Card
    //체크박스toggleTodo, 리스트항목todo.title, x버튼구현deleteTodo 에 덛씌움
  },
  setup() { // setup()후
    const {
      todos, // 배열
      addTodo,
      removeTodo,
      newTodo,
      changeTodo
    } = useTodos()// hooks useTodos사이클링에서 받아옴

    const today = getDate()
    // utils의 getDate를 today로 선언
    return { // return해야 상단에서 쓸수 있다
      todos,
      addTodo,
      removeTodo,
      newTodo,
      today,
      changeTodo
    }
  }
}

</script>

<style>
  .header-title:hover {
    cursor: pointer;
  }

  .header-title {
    text-align: center;
    height: 200px;
  }

  .header-title span {
    background-position-y: 0%;
    background-image: linear-gradient(white 50%, gold 50%);
    transition: background .5s ease;
    background-size: 2px;
    background-size: auto 175%;
  }

  .header-title span:hover {
    background-position-y: 100%;

  }

  .header-day {
    text-align: center;
    color: #c05694;
  }

  .placeholder {
    width: 100%;
    height: 80px;
    background: #aaa;
    border-radius: 10px;
  }

  .title-desc {
    color: #aaa;
    text-align: right;
  }

  .todo {
    width: 500px;
    margin: 0 auto;
  }

  .input-box>input {
    max-height: 32px;
    flex: 1 1 auto;
    line-height: 20px;
    padding: 8px 0;
    max-width: 100%;
    min-width: 0;
    width: 100%;
    background-color: transparent;
    border-style: none;
    font-family: "nanumburi";
  }

  .input-box {
    position: relative;
    transition: background .3s cubic-bezier(.25, .8, .5, 1);
    display: flex;
    margin-bottom: 8px;
    min-height: inherit;
    position: relative;
  }

  .input-box>input:focus {
    outline: none;
  }

  .input-box::before {
    bottom: -1px;
    content: "";
    left: 0;
    position: absolute;
    -webkit-transition: .3s cubic-bezier(.25, .8, .5, 1);
    transition: .3s cubic-bezier(.25, .8, .5, 1);
    width: 100%;
    border-style: solid;
    border-width: thin 0 0;
    border-color: rgba(0, 0, 0, .42);
  }

  .input-box:focus .input-box::before {
    border-color: red;
  }

  li>span {
    vertical-align: middle;
    display: inline-block;
  }

  li>span>input {
    position: relative;
    top: 1.3px;
  }

  ul {
    padding: 0;
    margin: 0 auto;
  }

  li {
    list-style: none;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
    margin-bottom: 20px;
  }

  li:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  .desc {
    float: right;
    position: relative;
    top: 0px;
    color: #eb596e;
  }

  .desc:hover,
  .checkbox:hover {
    cursor: pointer;
  }
</style>
