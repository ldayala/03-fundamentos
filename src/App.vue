<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <Counter title="elevacion cuadrado" :start="101"></Counter> -->
  <Indesicion />
</template>

<script>
import Indesicion from './components/Indesicion.vue'
//import Counter from "./components/Counter.vue";


export default {
    name: "App",
    components: {
       Indesicion,
      // Counter
        }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
