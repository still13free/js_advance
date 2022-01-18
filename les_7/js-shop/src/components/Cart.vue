<template>
  <div class="modal">
    <button v-on:click="onClick">Закрыть</button>
    <div class="cart-list">
      <cartCard
        v-for="item of list"
        v-bind:key="item.id_product"
        :good="item"
        :action_name="'Удалить'"
        v-on:remove-good="$emit('remove-from-cart')"
      ></cartCard>
    </div>
  </div>
</template>

<script>
import cartCard from "./CartCard.vue";

export default {
  name: "cart",
  components: {
    cartCard,
  },
  props: ["list"],
  methods: {
    onClick() {
      this.$emit("cart-close");
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>