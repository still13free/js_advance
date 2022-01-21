<template>
  <div v-if="not_responding">
    <error></error>
  </div>
  <div v-else class="home">
    <header>
      <button v-on:click="onCartOpen" class="cart-button" type="button">
        Корзина
      </button>
      <p>: {{ amount || 0 }} руб. ({{ count || 0 }} шт.)</p>
      <p>&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;</p>
      <p>Найти товар:</p>
      <sort />
    </header>

    <main>
      <showcase></showcase>
    </main>

    <cart v-if="isCartVisible" v-on:cart-close="onCartOpen"></cart>
  </div>
</template>

<script>
import showcase from "../components/Showcase.vue";
import cart from "../components/Cart.vue";
import Error from "../components/Error.vue";
import sort from "../components/Sort.vue";

export default {
  name: "Home",
  components: {
    showcase,
    cart,
    Error,
    sort,
  },
  data() {
    return {
      isCartVisible: false,
    };
  },
  methods: {
    onCartOpen() {
      this.isCartVisible = !this.isCartVisible;
    },
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
