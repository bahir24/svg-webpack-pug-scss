<template>
  <div class="container" v-if="!loading">
            <ul class="calc__tabs">
                <li class="calc__tabs-item" v-bind:class="{ active : tab }" @click="switchTab()">
					Прохождение ТО
                </li>
                <li class="calc__tabs-item" v-bind:class="{ active : !tab }" @click="switchTab()">
					Масляный сервис
                </li>
            </ul>
            <div class="calc-filter">
                <div class="calc-filter__left">
                    <div class="calc-result">
                        <span class="calc-result__head">Стоимость</span>
                        <p class="calc-result__price">{{ price ? price : minPrice }}</p>
                        <button class="hyundai-button hyundai-button--orange hyundai-button--desktop" @click="openModal()" type="button">Заказать звонок</button>
                    </div>
					<div class="calc-button">
						<button class="hyundai-button hyundai-button--mobile hyundai-button--dark" @click="openModal()" type="button">Заказать звонок</button>
					</div>
                </div>
                <div class="calc-filter__right">
                    <div class="reglament-tab">
                        <ul class="calc-filter__tabs">
                            <li v-for="(category, categoryIndex) in selects" :key="categoryIndex" @click="categoryOpen(category)" class="calc-filter__tabs-item" v-bind:class="{ hidden : !category.show }">
								<div class="category-line" v-bind:class="{ open : category.isOpen }">
									<span>{{ category.checked ? category.checked : category.name }}</span>
									<div class="toggle" v-bind:class="{ open : category.isOpen }"></div>
								</div>
								<ul class="calc-dropdown" v-bind:class="{ active : category.isOpen }">
								<li class="calc-dropdown__item" v-for="(value, index) in category.values" :key="index" @click="checkCategory(category, value, $event, categoryIndex)">
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
	},
  name: 'calculator',
  data() {
    return {
		price: undefined,
		minPrice: '7 027 руб',
		loading: false,
		jsonData: undefined,
		carList: undefined,
		selects: {
			names: {
				name: 'Модель',
				values: ['Solaris', 'Elantra', 'Sonata', 'Creta', 'Tucson', 'Santa Fe', 'Grand Santa Fe', 'Palisade', 'H1'],
				checked: undefined,
				isOpen: true,
				show: true
			},
			types: {
				name: 'Тип двигателя',
				values: undefined,
				checked: undefined,
				isOpen: false,
				show: true
			},
			values: {
				name: 'Рабочий объем',
				values: undefined,
				checked: undefined,
				isOpen: false,
				show: true
			},
			years: {
				name: 'Год',
				values: undefined,
				checked: undefined,
				isOpen: false,
				show: true
			},
			reglamentCount: {
				name: 'Номер ТО',
				values: ['ТО-0', 'ТО-1  1 год или 15 000км', 'ТО-2 1 год или 30 000км', 'ТО-3 1 год или 45 000км', 'ТО-4 1 год или 60 000км', 'ТО-5 1 год или 75 000км', 'ТО-6  1 год или 90 000км', 'ТО-7 1 год или 105 000км', 'ТО-8  1 год или 120 000км'],
				checked: undefined,
				isOpen: false,
				show: true
			},
		},
    	tab: true,
    }
  },
	computed: {
  	},
	methods: {
		openModal(){
			let modal = document.querySelector('.modal');
			let form = modal.querySelector('form');
			modal.classList.remove('modal-hide');
			document.querySelector('body').classList.add('body-blocked');
			let selectsKeys = Object.keys(this.selects);
			selectsKeys.forEach(selectKey => {
				let input = document.createElement('input');
				input.type = 'hidden';

				if(selectKey == 'reglamentCount' && !this.tab){
					input.name = 'Oil';
					input.value = this.price;
				} else {
					input.name = selectKey;
					input.value = this.selects[selectKey].checked ? this.selects[selectKey].checked : 'Не выбрано';
				}



				form.appendChild(input);
			})

		},
		switchTab(){
			this.tab = !this.tab;
			this.selects.reglamentCount.show = this.tab;
			this.price = undefined;
			this.minPrice = this.tab ? '7 027 руб' : '2 999 руб';
			if(this.carList.length === 1){
				let car = this.carList[0];
				this.tab ? this.setReglamentPrice(car) : this.setOilPrice(car);
			}
		},
		categoryOpen(category){
			if(!category.isOpen){
				category.checked = undefined;
			}
			category.isOpen = !category.isOpen;
			this.filterData();
		},
		checkCategory(category, value, event, index){
			event.stopPropagation();
			category.checked = value;
			if(index == 'names'){
				this.dropFilters();
			}
			this.filterData();
			if(this.carList.length === 1){
				let car = this.carList[0];
				this.tab ? this.setReglamentPrice(car) : this.setOilPrice(car);
			} else {
				this.price = undefined;
			}
			category.isOpen = false;
		},
		filterData(){
			this.carList = this.jsonData.filter(car => {
				return (this.selects.names.checked ? car.name == this.selects.names.checked : true) &&
				(this.selects.values.checked ? car.value == this.selects.values.checked : true) &&
				(this.selects.types.checked ? car.type == this.selects.types.checked : true) &&
				(this.selects.years.checked ? car.year == this.selects.years.checked : true);
			});
			this.selectsValue();
		},
		selectsValue(){
			let setValues = new Set();
			let setTypes = new Set();
			let setYears = new Set();
			this.carList.forEach(car => {
				setValues.add(car.value);
				setTypes.add(car.type);
				setYears.add(car.year);
			});
			this.selects.types.values = [...setTypes];
			this.selects.values.values = [...setValues];
			this.selects.years.values = [...setYears];
		},
		dropFilters(){
			this.selects.types.checked = undefined;
			this.selects.values.checked = undefined;
			this.selects.years.checked = undefined;
		},
		setReglamentPrice(car){
			if(this.selects.reglamentCount.checked){
				let index = this.selects.reglamentCount.values.indexOf(this.selects.reglamentCount.checked);
				this.price = car.prices[index];
			}
		},
		setOilPrice(car){
			this.price = car.oil;
		}
	}
}

</script>