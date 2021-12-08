<template>
  <div class="container" v-if="!loading">
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
                        <p class="calc-result__price">{{ price ? price : '-' }}</p>
                        <button class="hyundai-button hyundai-button--orange" type="button">Заказать звонок</button>
                    </div>
                </div>
                <div class="calc-filter__right">
                    <div class="reglament-tab">
                        <ul class="calc-filter__tabs">
                            <li v-for="(category, index) in selects" :key="index" @click="categoryOpen(category)" class="calc-filter__tabs-item">
								<span>{{ category.checked ? category.checked : category.name }}</span>
								 <ul class="calc-dropdown" v-bind:class="{ active : category.isOpen }">
								 	<li class="calc-dropdown__item" v-for="(value, index) in category.values" :key="index" @click="checkCategory(category, value, $event)">
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
		this.loading = true;
		fetch("data.json")
			.then(r => r.json())
			.then(json => {
			this.jsonData=json.offerData;
			this.loading = false;
			this.filterData();
		},
	response => {

  		console.log('Error loading json:', response)
		this.loading = true;
	});

	// .finally(() => {this.loading = true;})
	},
  name: 'calculator',
  data() {
    return {
		price: undefined,
		loading: false,
		jsonData: undefined,
		carList: undefined,
		selects: {
			names: {
				name: 'Модель',
				values: undefined,
				checked: undefined,
				isOpen: true,
			},
			types: {
				name: 'Тип двигателя',
				values: undefined,
				checked: undefined,
				isOpen: false,
			},
			values: {
				name: 'Рабочий объем',
				values: undefined,
				checked: undefined,
				isOpen: false,
			},
			years: {
				name: 'Год',
				values: undefined,
				checked: undefined,
				isOpen: false,
			},
			reglamentCount: {
				name: 'Номер ТО',
				values: ['ТО-1', 'ТО-2', 'ТО-3', 'ТО-4', 'ТО-5', 'ТО-6', 'ТО-7', 'ТО-8'],
				checked: undefined,
				isOpen: false,
			},
		},
    	tab: true,
    }
  },
	computed: {
  	},
	methods: {
		categoryOpen(category){
			if(!category.isOpen){
				category.checked = undefined;
			}
			category.isOpen = !category.isOpen;
			this.filterData();
		},
		checkCategory(category, value, event){
			event.stopPropagation();
			category.checked = value;
			this.filterData();
			category.isOpen = false;
			if(this.carList.length == 1 && this.selects.reglamentCount.checked){
				let index = this.selects.reglamentCount.checked.substr(-1) - 1;
				this.price = this.carList[0].prices[index];
			} else {
				this.price = undefined;
			}
		},
		filterData(){
			let carList = this.jsonData.filter(car => {
				return (this.selects.names.checked ? car.name == this.selects.names.checked : true) &&
				(this.selects.values.checked ? car.value == this.selects.values.checked : true) &&
				(this.selects.types.checked ? car.type == this.selects.types.checked : true) &&
				(this.selects.years.checked ? car.year == this.selects.years.checked : true);
			});
			this.carList = carList;
			this.selectsValue();

		},
		selectsValue(){
			let setModels = new Set();
			let setValues = new Set();
			let setTypes = new Set();
			let setYears = new Set();
			this.carList.forEach(car => {
				setModels.add(car.name);
				setValues.add(car.value);
				setTypes.add(car.type);
				setYears.add(car.year);
			});
			this.selects.names.values = [...setModels];
			this.selects.types.values = [...setTypes];
			this.selects.values.values = [...setValues];
			this.selects.years.values = [...setYears];
		},
	}
}

</script>