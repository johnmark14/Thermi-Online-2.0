
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
        isItem: false
    },
    getCart() {
        axios.get('/cart.js').then(response => {
            this.state.cartState.unshift(response.data)
            const loader = document.getElementById('loading');
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.remove();
            }, 1000)
            this.state.isItem = response.data.item_count != 0 ? true : false; 
        }).catch(error => {
            console.log(`Error from store ${error}`)
        })
    }
})

// window.addEventListener("load", function(event) {
//     const loader = document.getElementById('loading');
//     setTimeout(function() {
//         loader.style.opacity = '0';
//         setTimeout(function() {
//             loader.remove();
//         }, 500)
//     }, 900);
//   });


