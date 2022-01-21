<template>
  <div class="goods-list">
    <cartCard
      v-for="item of list"
      v-bind:key="item.id_product"
      :good="item"
      :action_name="'Удалить'"
      v-on:cardaction="onRemove"
    ></cartCard>
  </div>
</template>

<script>
import cartCard from "./CartCard.vue";

export default {
  name: "cartlist",
  components: {
    cartCard,
  },
  methods: {
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