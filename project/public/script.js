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
        addtoCart() {

            console.log(event.target)

            // id
            // product
            // fetch(`${API_URL}/cart/add`, {
            //     method: 'POST',
            //     headers: {
            //         "Content-Type": "application/json;odata=verbose",
            //     },
            //     body: JSON.stringify(product)
            // })
            //     .then((res) => {
            //         return res.json()
            //     })
            //     .then((data) => {
            //         this.cart = data
            //     })
        },
        removeFromCart() {

            console.log(event.target)

            // id
            // fetch(`${API_URL}/cart/remove`, {
            //     method: 'POST',
            //     headers: {
            //         "Content-Type": "application/json;odata=verbose",
            //     },
            //     body: JSON.stringify({ "id_product": id, })
            // })
            //     .then((res) => {
            //         return res
            //     })
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