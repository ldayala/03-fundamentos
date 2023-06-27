<template>
  <img v-if="img" :src="img" alt="bg" />
  <div class="bg-dark"></div>

  <div class="indecision-container">
    <input type="text" name="" id="" placeholder="Hazme una pregunta" v-model="question" />
    <p>Recuerda terminar la preguunta con un signo de (?).</p>
    <div v-if="isValidQuestion">
      <h2>{{ question }}</h2>
      <h1>{{ answer }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Indesicion",

  data() {
    return {
      question: null,
      answer: null,
      img: null,
      isValidQuestion: false,
    };
  },
  methods: {
    async getAnswer() {
      try {
        this.answer = "Pensando...."; //mientras hago la peticion answer mostrara pensando...
        const { answer, image } = await fetch("https://yesno.wtf/api").then(
          (r) => r.json()
        );
        this.img = image;
        this.answer = answer;
        switch (this.answer) {
          case "yes":
            this.answer = "Si!!!";
            break;
          case "no":
            this.answer = "No!!!";
          // break;
          default:
            this.answer = "Quizas";
            break;
        }
      } catch (error) {
        console.log('Indesicion Component Error:',error);
        this.answer = "Error en la llamada a la Api";
        this.img = null;
      }
    },
  },
  watch: {
    //este es un observable, va estar pendiente de cualquier cambio en la propiedad que le pasemos
    question(value, oldvalue) {
      console.log("valor:", value);
      this.isValidQuestion = false;
      //valor actual , ultimo valor antes del cambio
      if (!value.includes("?")) return;

      this.isValidQuestion = true;
      //TODO: hacer peticion http
      this.getAnswer();
    },
  },
};
</script>

<style scoped>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}

input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 0px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>
