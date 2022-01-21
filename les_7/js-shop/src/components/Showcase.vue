<template>
  <div class="goods-list">
    <card
      v-for="item of list"
      v-bind:key="item.id_product"
      :good="item"
      :action_name="'Купить'"
      v-on:cardaction="onAdd"
    ></card>
  </div>
</template>

<script>
import card from "./Card.vue";

export default {
  name: "showcase",
  components: {
    card,
  },
  methods: {
    onAdd(product) {
      this.$store.dispatch("addToCart", product);
    },
  },
  computed: {
    list() {
      return this.$store.getters.getShowcase;
    },
  },
};
</script>