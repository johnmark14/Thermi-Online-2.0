
// window.addEventListener('load', function() {
//     const loader = document.getElementById('loading');
//     setTimeout(function() {
//         loader.style.opacity = '0';
//         setTimeout(function() {
//             loader.remove();
//         }, 500)
//     }, 1300);
// })
console.log("start")
const store = Vue.reactive({
    state: {
        cartState: [],
        isItem: false,
        isCartOpen: false,
        isOverlay: false,
        personalization: '40400432300241',
        personalizationPrice: 0,
        isPersonalizeIncluded: false
    },
    getCart() {
        axios.get('/cart.js').then(response => {
            this.state.cartState.unshift(response.data)

            this.checkIfPersonalizeIsAdded(response)
            
            const loader = document.getElementById('loading');
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.remove();
            }, 1000)

            // Indicator for bubble notification on header cart icon 
            this.state.isItem = response.data.item_count != 0 ? true : false; 
        }).catch(error => {
            console.log(`Error from store ${error}`)
        })
    },
    // This gets the add on personalization price
    getPersonalizationPrice() {
        axios.get('/products/personalization.js').then(response => {
            this.state.personalizationPrice = response.data.price
            // console.log(this.state.personalizationPrice)
        }).catch(error => {
            console.log(`Error from personalization ${error}`)
        })
    },
    addQuantity(item, event) {
        const data = {
            "id": item.key,
            "quantity": item.quantity + 1
        }

        event.target.style.cursor = "wait"

        axios.post('/cart/change.js', data).then(response => {
            // Used to add personalization quantity
            if(item.properties.personalization) {
                axios.post('/cart/change.js', {
                    "id": this.state.personalization,
                    "quantity": item.quantity + 1
                }).then(res => {
                    this.state.cartState.unshift(res.data)

                    this.checkIfPersonalizeIsAdded(res)

                    event.target.style.cursor = "pointer"
                }).catch(error => {
                    console.log(`Error from add quantity personalization: ${error}`)
                })
                console.log('executed')
            } else {
                this.state.cartState.unshift(response.data)

                this.checkIfPersonalizeIsAdded(response)

                event.target.style.cursor = "pointer"
            }
        }).catch(error => {
            console.log(`Error from add quantity: ${error}`)
        })

        
    },
    removeQuantity(item, event) {
        const data = {
            "id": item.key,
            "quantity": item.quantity - 1
        }

        event.target.style.cursor = "wait"
        axios.post('/cart/change.js', data).then(response => {
            

            // Used to minus Personalization Quantity
            if(item.properties.personalization) {
                axios.post('/cart/change.js', {
                    "id": this.state.personalization,
                    "quantity": item.quantity - 1
                }).then((res) => {
                    this.state.cartState.unshift(res.data)

                    this.checkIfPersonalizeIsAdded(res)

                    event.target.style.cursor = "pointer"

                    // Indicator for bubble notification on header cart icon 
                    this.state.isItem = res.data.item_count != 0 ? true : false;
                }).catch(error => {
                    console.log(`Error from minus quantity personalization: ${error}`)
                })
                console.log('executed')
            } else {
                this.state.cartState.unshift(response.data)

                this.checkIfPersonalizeIsAdded(response)

                event.target.style.cursor = "pointer"

                // Indicator for bubble notification on header cart icon 
                this.state.isItem = response.data.item_count != 0 ? true : false;
            }
        }).catch(error => {
            console.log(`Error from add quantity: ${error}`)
        })
    },
    checkIfPersonalizeIsAdded(response) {
        // Reset data
        this.state.isPersonalizeIncluded = false
        
        response.data.items.forEach(item => {
            if(item.product_type == 'hidden') {
                this.state.isPersonalizeIncluded = true
            }
        });
    }
});

// window.addEventListener("load", function(event) {
//     const loader = document.getElementById('loading');
//     setTimeout(function() {
//         loader.style.opacity = '0';
//         setTimeout(function() {
//             loader.remove();
//         }, 500)
//     }, 900);
//   });


