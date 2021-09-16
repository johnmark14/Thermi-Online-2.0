const store = Vue.reactive({
    state: {
        cartState: []
    },
    getCart() {
        axios.get('/cart.js').then(response => {
            this.state.cartState.unshift(response.data)
        }).catch(error => {
            console.log(`Error on store fn: ${error}`)
        })
    }
})