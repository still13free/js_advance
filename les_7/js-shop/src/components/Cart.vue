<template>
  <div class="modal">
    <button v-on:click="onClick">Закрыть</button>
    <div class="cart-list">
      <cartCard
        v-for="item of list"
        v-bind:key="item.id_product"
        :good="item"
        :action_name="'Удалить'"
        v-on:cardaction="onRemove"
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
  methods: {
    onClick() {
      this.$emit("cart-close");
    },
    onRemove(product) {
      this.$store.dispatch("removeFromCart", product);
    },
  },
  computed: {
    list() {
      return this.$store.getters.getCart.contents;
    },
  },
};
</script>