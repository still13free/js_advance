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