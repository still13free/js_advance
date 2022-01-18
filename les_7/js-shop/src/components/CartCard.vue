<template>
  <div class="card">
    <p>{{ good.product_name }}: {{ good.price }}руб. x{{ good.quantity }}</p>
    <button :data-id="good.id_product" v-on:click="$emit('remove-good')">
      {{ action_name }}
    </button>
  </div>
</template>

<script>
export default {
  name: "cartCard",
  props: ["good", "action_name"],
};
</script>