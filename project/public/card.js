Vue.component('card',
    {
        template: `
            <div class="card">
                <h3>{{ good.product_name }}</h3>
                <p>{{ good.price }}руб.</p>
                <button :data-id="good.id_product" v-on:click="$emit('add-good')">{{ action_name }}</button>
            </div>
        `,
        props: ['good', 'action_name'],
    }
)