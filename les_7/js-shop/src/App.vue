<template>
  <div id="nav">
    <router-view />
  </div>
</template>

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
</style>
