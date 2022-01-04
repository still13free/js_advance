Vue.component('showcase',
    {
        template: `
            <div class="goods-list">
                <card v-for="item of list" :good="item" :action_name="'Купить'"></card>
            </div>
        `,
        props: ['list']
    }
)