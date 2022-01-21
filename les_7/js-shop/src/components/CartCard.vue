<template>
  <div class="card">
    <p>
      {{ good.product_name }}: {{ good.price }}руб. x{{ good.quantity }}
      <button :data-id="good.id_product" v-on:click="onClick">
        {{ action_name }}
      </button>
    </p>
  </div>
</template>

<script>
export default {
  name: "cartCard",
  props: ["good", "action_name"],
  methods: {
    onClick() {
      this.$emit("cardaction", this.good);
    },
  },
};
</script>