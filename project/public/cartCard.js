Vue.component('cartCard',
    {
        template: `
            <div class="card">
                <p>{{ good.product_name }}: {{ good.price }}руб. x{{ good.quantity }}</p>
                <button :data-id="good.id_product">{{ action_name }}</button>
            </div>
        `,
        props: ['good', 'action_name'],
    }
)