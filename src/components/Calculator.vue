<template>
  <div class="container">
            <ul class="calc__tabs">
                <li class="calc__tabs-item" v-bind:class="{ active : tab }" @click="tab = !tab">
                    <label for="reglament-tab-input">
                        Прохождение ТО
                    </label>
                </li>
                <li class="calc__tabs-item" v-bind:class="{ active : !tab }" @click="tab = !tab">
                    <label for="oil-tab-input">
                        Масляный сервис
                    </label>
                </li>
            </ul>
            <div class="calc-filter">
                <div class="calc-filter__left">
                    <div class="calc-result">
                        <span class="calc-result__head">Стоимость</span>
                        <p class="calc-result__price">2375</p>
                        <button class="hyundai-button hyundai-button--orange" type="button">Заказать звонок</button>
                    </div>
                </div>
                <div class="calc-filter__right">
                    <div class="reglament-tab">
                        <ul class="calc-filter__tabs">
                            <li v-for="(category, index) in calc.reglament.data" :key="index" @click="category.isOpen = !category.isOpen" class="calc-filter__tabs-item">
								<span>{{ category.checked ? category.checked : category.name }}</span>
								 <ul class="calc-dropdown" v-bind:class="{ active : category.isOpen }">
								 	<li class="calc-dropdown__item" v-for="(value, index) in category.value" :key="index" @click="category.checked = value">
									 	{{ value }}
									</li>
								 </ul>
							</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
	mounted(){
	fetch("excel/data.json")
    	.then(r => r.json())
    	.then(json => {
      	this.jsonData=json;
    },
	response => {
  		console.log('Error loading json:', response)
	})
	},
  name: 'calculator',
  data() {
    return {
		jsonData: false,
        calc: {
        	reglament: {
				data: {
					model: {
						name: 'Модель',
						checked: false,
						isOpen: true,
						value: ['creta', 'tucson', 'solaris', 'santa', 'palisade', 'h1'],
					},
					engineValue: {
						name: 'Рабочий объем',
						checked: false,
						isOpen: false,
						value: ['1.4', '1.6', '1.8', '2.0', '2.4 GDi', '2.5', '1.6T GDI', '2.5 GDI', '3.5', '2.2', '2.4', '3.3', '3.0 GDI'],
					},
					engineType: {
						name: 'Тип двигателя',
						checked: false,
						isOpen: false,
						value: ['бензиновый', 'дизельный'],
					},
					reglamentCount: {
						name: 'Номер ТО',
						checked: false,
						isOpen: false,
						value: ['ТО-1', 'ТО-2', 'ТО-3', 'ТО-4', 'ТО-5', 'ТО-6', 'ТО-7'],
					}
				},
        	},
			oil: {
				data: {
					model: {
						name: 'Модель',
						value: ['creta', 'tucson', 'solaris', 'santa', 'palisade', 'h1'],
					},
					engineValue: {
						name: 'Рабочий объем',
						value: ['1.4', '1.6', '1.8', '2.0', '2.4 GDi', '2.5', '1.6T GDI', '2.5 GDI', '3.5', '2.2', '2.4', '3.3', '3.0 GDI'],
					},
					engineType: {
						name: 'Тип двигателя',
						value: ['бензиновый', 'дизельный'],
					},
					reglamentCount: {
						name: 'Номер ТО',
						value: ['ТО-1', 'ТО-2', 'ТО-3', 'ТО-4', 'ТО-5', 'ТО-6', 'ТО-7'],
					}
				}
			}
      },
      tab: true,
    }
  },
  computed: {

  },
  methods: {
  }
}

</script>