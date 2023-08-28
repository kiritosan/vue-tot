<template>
  <div class="pic">
    <button @click="backward"><</button>
    <!-- <img :src="`../assets/${key % 3}.png`" alt="" /> -->

    <img v-if="key%3===0" src="../assets/0.png" alt="">
    <img v-if="key%3===1" src="../assets/1.png" alt="">
    <img v-if="key%3===2" src="../assets/2.png" alt="">
    <button @click="forward">></button>

  </div>
</template>

<script>
export default {
  name: 'PicChange',
  props: {
  },
  data() {
    return {
      key: 0,
    };
  },
  methods: {
    forward() {
      this.key++;
      this.key = this.key > 2 ? 2 : this.key;
    },
    backward() {
      this.key--;
      this.key = this.key < 0 ? 0 : this.key;
    },
  },
  mounted() {

  },
  watch: {
    key() {
      console.log(this.key)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  width: 200px;
  height: 200px;
}
.pic {
  display: flex;
}
</style>
