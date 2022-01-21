<template>
  <div id="nav">
    <nav>
      <router-link to="/">Главная</router-link>
      |
      <router-link to="cart">Корзина</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("loadShowcase");
    this.$store.dispatch("loadCart");
  },
};
</script>

<style lang="scss">
header {
  height: 30px;
  background-color: lightgray;
  padding: 5px 25px;
  display: flex;
  align-items: center;
}
.goods-list {
  padding: 15px 0;
  display: flex;
  justify-content: space-evenly;
  background-color: aliceblue;
}
.card {
  border: 1px solid black;
  box-sizing: border-box;
  min-width: 100px;
  min-height: 35px;
  text-align: center;
}
.modal {
  width: 800px;
  min-height: 600px;
  position: absolute;
  top: 100px;
  left: calc(50% - 400px);
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 3px;
  padding: 20px;
}
nav {
  text-align: center;
}
</style>
