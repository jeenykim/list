<template>
  <nav>
    <router-link :to="{ name: 'Home' }" class="logo"><span>home</span></router-link>
    <router-link :to="{ name: 'Todo' }">board</router-link>
  </nav>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>


<style>
@font-face {
  font-family: "MaruBuri";
  src: url("assets/MaruBuri-Regular.woff2") format("woff2");
}
body{
  font-family: "MaruBuri";
  margin: 0 auto;
  padding: 0;
}
nav{
  background: rgba(0,0,0,0.8);
  width:100%;
  padding:10px;
  text-align: center;
    box-sizing: border-box;
}
a{
  text-decoration: none;
  color:white;
}
.logo{
  float: left;
  width:0;
}
</style>
