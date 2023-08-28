<template>
  <div class="notepad">
    <div class="topControl">
      <input type="text" v-model="text" @keyup.enter="add(text)" />
      <button @click="add(text)">添加</button>
    </div>
    <ul class="notes">
      <li v-for="item in memoArr" :key="item.uid">
        <label @click="() => checkClickHandle(item.uid, item.checked)"
          ><input type="checkbox" :checked="item.checked" />{{
            item.content
          }}</label
        >
        <button @click="() => deleteItem(item.uid)">删除</button>
      </li>
    </ul>

    <div ref="checkAllBox" class="control">
      <input type="checkbox" @click="checkAll" :checked="checkAllStatus" />
      {{ memoArr.length }} items / {{ numberOfDone }} done
      <button @click="clear">清除</button>
      <!-- render a checkbox which is indeterminate -->
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import { localGet, localSet } from "../utils/index.js";

export default {
  name: "NotePad",
  props: {},
  data() {
    return {
      memoArr: [],
      text: "",
      checkAllStatus: false,
    };
  },
  mounted() {
    this.memoArr = JSON.parse(localGet("memoArr")) || [];
    this.checkAllStatus = JSON.parse(localGet("checkAllStatus")) || false;
  },
  methods: {
    add(text) {
      if (!text) {
        return;
      }
      this.memoArr.push({
        checked: false,
        uid: nanoid(),
        content: text,
      });
      this.text = "";
      // localSet("memoArr", JSON.stringify(this.memoArr));
      // localSet("checkAllStatus", this.checkAllStatus);
    },
    clear() {
      this.memoArr = [];
      this.checkAllStatus = false;
      // localSet("memoArr", JSON.stringify(this.memoArr));
      // localSet("checkAllStatus", this.checkAllStatus);
    },
    checkClickHandle(uid, status) {
      const index = this.memoArr.findIndex((item) => item.uid === uid);
      this.memoArr[index].checked = status ? false : true;
      this.checkAllStatus = this.memoArr.every((item) => item.checked === true);

      // this.$ref.checkAllBox.indeterminate = this.memoArr.length
      //   ? !this.checkAllStatus
      //   : false;
      // localSet("memoArr", JSON.stringify(this.memoArr));
      // localSet("checkAllStatus", this.checkAllStatus);
    },
    checkAll() {
      this.checkAllStatus = this.checkAllStatus ? false : true;
      this.memoArr = this.memoArr.map((item) => {
        item.checked = this.checkAllStatus;
        return item;
      });
      // localSet("memoArr", JSON.stringify(this.memoArr));
      // localSet("checkAllStatus", this.checkAllStatus);
    },
    deleteItem(uid) {
      const index = this.memoArr.findIndex((v) => v.uid === uid);
      this.memoArr.splice(index, 1);
      this.checkAllStatus =
        this.memoArr.length &&
        this.memoArr.every((item) => item.checked === true);
      // this.checkAllStatus = this.memoArr.length && this.memoArr.filter(v=>v.checked === true).length === this.memoArr.length
      console.log(this.checkAllStatus);
      // localSet("memoArr", JSON.stringify(this.memoArr));
      // localSet("checkAllStatus", this.checkAllStatus);
    },
  },
  computed: {
    numberOfDone() {
      return this.memoArr.filter((item) => item.checked === true).length;
    },
  },
  updated() {
    localSet("memoArr", JSON.stringify(this.memoArr));
    localSet("checkAllStatus", this.checkAllStatus);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

.topControl {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notepad {
  width: 400px;
  margin: 0 auto;
}

.notepad input[type="text"] {
  width: 300px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
}

.notepad input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.notepad button {
  width: 50px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
}

.notepad .notes {
  margin-top: 20px;
}

.notepad .notes li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.notepad .notes li label {
  display: flex;
  align-items: center;
}

.notepad .notes li label input {
  margin-right: 10px;
}

.notepad .notes li button {
  width: 50px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
}

.control {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
