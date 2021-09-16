
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loading');
    setTimeout(function() {
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.remove();
        }, 500)
    }, 1300);
})