const API_URL = 'http://localhost:3000/api/v1';

new Vue({
    el: '#app',
    data: {
        showcase: [],
        cart: {},
        isCartVisible: false,
    },
    methods: {
        onCartOpen() {
            this.isCartVisible = !this.isCartVisible
        },
        addToCart() {
            const id = Number(event.target.dataset.id)
            const idx = this.showcase.findIndex((good) => good.id_product == id)
            const product = {
                "id_product": this.showcase[idx].id_product,
                "product_name": this.showcase[idx].product_name,
                "price": this.showcase[idx].price,
                "quantity": 1
            };

            fetch(`${API_URL}/cart/add`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;odata=verbose",
                },
                body: JSON.stringify(product)
            })
                .then((res) => {
                    this.cart.amount += product.price
                    this.cart.countGoods += 1
                    const _idx = this.cart.contents.findIndex((good) => good.id_product == id)
                    if (_idx >= 0) {
                        this.cart.contents[_idx].quantity += 1
                    } else {
                        this.cart.contents.push(product)
                    }
                })
        },
        removeFromCart() {
            const id = Number(event.target.dataset.id)

            fetch(`${API_URL}/cart/remove`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;odata=verbose",
                },
                body: JSON.stringify({ "id_product": id, })
            })
                .then((res) => {
                    const _idx = this.cart.contents.findIndex((good) => good.id_product == id)
                    this.cart.amount -= this.cart.contents[_idx].price
                    this.cart.countGoods -= 1
                    this.cart.contents[_idx].quantity -= 1

                    if (this.cart.contents[_idx].quantity <= 0) {
                        this.cart.contents.splice(_idx, 1)
                    }
                })
        },
    },
    mounted() {
        fetch(`${API_URL}/showcase`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.showcase = data
            })

        fetch(`${API_URL}/cart`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.cart = data
            })
    }
})