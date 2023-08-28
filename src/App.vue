<template>
  <div id="app">
    <!-- <button @click="minus">-</button>
    <span>{{ num }}</span>
    <button @click="add">+</button>
    <h1>=============================</h1>
    <PicChange /> -->
    <NotePad />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import PicChange from "./components/PicChange.vue";
import NotePad from "./components/NotePad.vue";

export default {
  name: "App",
  components: {
    // PicChange,
    NotePad,
  },
  data() {
    return {
      msg: 0,
      input: 0,
      num: 0,
    };
  },
  methods: {
    add() {
      this.num++;
    },
    minus() {
      if (this.num === 0) {
        return;
      }
      this.num--;
    },
  },
  watch: {},
  computed: {},
  beforeMount() {
    // console.log({...this})
    console.log(this.$el)
    console.log(this)
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  display: flex;
  justify-content: center;
  /* align-items: center; */
  height: 600px;
  /* width: 60px; */
}
button {
  color: rgb(57, 2, 2);
  background-color: aquamarine;
}
</style>
