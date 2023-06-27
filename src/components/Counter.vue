<template>
  <h2>{{ titleComp }}</h2>
  <p>{{ counter }} * <sup>2</sup>={{ elevaCuadrado() }}</p>
  <p>{{ counter }} * <sup>2</sup>={{ proElevaCuadrado }}</p>
  <p data-testId="counter">{{ counter }}</p>
  <div  class="botton">
    <button @click="increase">1 +</button>
    <button @click="decrease">1 -</button>
  </div>
</template>

<script>
export default {
  //name: "contador",
  //props: ["title"],
  props: {
    start: {
      required:false,
      type: Number,
      default: 100,
      validator(value) {
        //retorna true si la validacion pasa sino muestra error
        return value >=100;
      },
    },
    title: String,
  },
  data() {
    return {
      counter: this.start,
    };
  },
  methods: {
    elevaCuadrado() {
      return this.counter * this.counter;
    },
    increase() {
      this.counter++;
    },
    decrease() {
      this.counter--;
    },
  },
  computed: {
    proElevaCuadrado() {
      return this.counter * this.counter;
    },
    titleComp() {
      return this.title || "Counter";
    },
  },
};
</script>

<style>
button {
  border-radius: 5px;
  margin: 0 10px;
  padding: 5px 10px;
}
</style>
