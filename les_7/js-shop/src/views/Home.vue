<template>
  <div class="home">
    <header>
      <button v-on:click="onCartOpen" class="cart-button" type="button">
        Корзина
      </button>
      <p>{{ cart.amount }} руб.</p>
    </header>

    <main>
      <showcase :list="showcase" v-on:add-to-cart="onAddToCart"></showcase>
    </main>

    <cart
      v-if="isCartVisible"
      :list="cart.contents"
      v-on:cart-close="onCartOpen"
      v-on:remove-from-cart="onRemoveFromCart"
    ></cart>
  </div>
</template>

<script>
const API_URL = "http://localhost:3000/api/v1";

import showcase from "../components/Showcase.vue";
import cart from "../components/Cart.vue";

export default {
  name: "Home",
  components: {
    showcase,
    cart,
  },
  data() {
    return {
      showcase: [],
      cart: {},
      isCartVisible: false,
    };
  },
  methods: {
    onCartOpen() {
      this.isCartVisible = !this.isCartVisible;
    },
    onAddToCart() {
      const id = Number(event.target.dataset.id);
      const idx = this.showcase.findIndex((good) => good.id_product == id);
      const product = {
        id_product: this.showcase[idx].id_product,
        product_name: this.showcase[idx].product_name,
        price: this.showcase[idx].price,
        quantity: 1,
      };

      fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;odata=verbose",
        },
        body: JSON.stringify(product),
      }).then(() => {
        this.cart.amount += product.price;
        this.cart.countGoods += 1;
        const _idx = this.cart.contents.findIndex(
          (good) => good.id_product == id
        );
        if (_idx >= 0) {
          this.cart.contents[_idx].quantity += 1;
        } else {
          this.cart.contents.push(product);
        }
      });
    },
    onRemoveFromCart() {
      const id = Number(event.target.dataset.id);

      fetch(`${API_URL}/cart/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;odata=verbose",
        },
        body: JSON.stringify({ id_product: id }),
      }).then(() => {
        const _idx = this.cart.contents.findIndex(
          (good) => good.id_product == id
        );
        this.cart.amount -= this.cart.contents[_idx].price;
        this.cart.countGoods -= 1;
        this.cart.contents[_idx].quantity -= 1;

        if (this.cart.contents[_idx].quantity <= 0) {
          this.cart.contents.splice(_idx, 1);
        }
      });
    },
  },
  mounted() {
    fetch(`${API_URL}/showcase`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.showcase = data;
      });

    fetch(`${API_URL}/cart`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.cart = data;
      });
  },
};
</script>
