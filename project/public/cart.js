Vue.component('cart',
    {
        template: `
            <div class="modal">
                <button v-on:click="onClick">Закрыть</button>
                <div class="cart-list">
                    <cartCard v-for="item of list" :good="item" :action_name="'Удалить'" v-on:remove-good="$emit('remove-from-cart')"></cartCard>
                </div>
            </div>
        `,
        props: ['list'],
        methods: {
            onClick() {
                this.$emit('cart-close')
            }
        },
    }
)