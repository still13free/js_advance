<template>
  <div class="card">
    <h3>{{ good.product_name }}</h3>
    <p>{{ good.price }} руб.</p>
    <button :data-id="good.id_product" v-on:click="onClick">
      {{ action_name }}
    </button>
  </div>
</template>

<script>
export default {
  name: "card",
  props: ["good", "action_name"],
  methods: {
    onClick() {
      const product = {
        id_product: this.good.id_product,
        product_name: this.good.product_name,
        price: this.good.price,
        quantity: 1,
      };
      this.$emit("cardaction", product);
    },
  },
};
</script>