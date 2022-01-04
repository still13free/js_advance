Vue.component('showcase',
    {
        template: `
            <div class="goods-list">
                <card v-for="item of list" :good="item" :action_name="'Купить'" v-on:add-good="$emit('add-to-cart')"></card>
            </div>
        `,
        props: ['list']
    }
)