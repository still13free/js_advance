<template>
  <div v-if="not_responding">
    <error></error>
  </div>
  <div v-else class="home">
    <header>
      <h3>Корзина:&nbsp;</h3>
      <p>{{ amount || 0 }} руб. ({{ count || 0 }} шт.)</p>
    </header>

    <main>
      <cart></cart>
    </main>
  </div>
</template>

<script>
import cart from "../components/CartList.vue";
import Error from "../components/Error.vue";

export default {
  name: "CartPage",
  components: {
    cart,
    Error,
  },
  computed: {
    not_responding() {
      return this.$store.getters.getServerError;
    },
    amount() {
      return this.$store.getters.getCart.amount;
    },
    count() {
      return this.$store.getters.getCart.countGoods;
    },
  },
};
</script>
