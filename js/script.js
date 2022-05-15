function addToCart(element){
        alert("Item successfully added to cart.")
        localStorage.setItem(element.previousElementSibling.previousElementSibling.innerHTML, element.previousElementSibling.innerHTML);
        document.querySelectorAll('.badge')[0].innerHTML = localStorage.length - 1;
}
document.querySelectorAll('.badge')[0].innerHTML = localStorage.length - 1;