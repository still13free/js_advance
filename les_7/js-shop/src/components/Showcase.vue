<template>
  <div class="goods-list">
    <card
      v-for="item of list"
      v-bind:key="item.id_product"
      :good="item"
      :action_name="'Купить'"
      v-on:add-good="$emit('add-to-cart')"
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
  props: ["list"],
};
</script>