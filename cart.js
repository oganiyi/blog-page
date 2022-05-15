let cartList = document.getElementById('cartList');
let totalItemPrice;

let finalTotalHTML = document.querySelector('#finalTotal');
let finalTotal;

function calcFinalTotal(){
    finalTotal = 0;
    for(let i = 0; i < document.querySelectorAll('.totalPrice').length; i++){
        finalTotal += parseInt(document.querySelectorAll('.totalPrice')[i].innerHTML);
        }
        finalTotalHTML.innerHTML = finalTotal;
        localStorage.setItem("Total price", finalTotal);

}

function keyUp(x){
    totalItemPrice = x.parentNode.nextElementSibling.childNodes[0];
    totalItemPrice.innerHTML = "";
    totalItemPrice.innerHTML += 
    `
        <b>Total item price: </b><span class="totalPrice">${x.value * x.parentNode.previousElementSibling.childNodes[1].innerHTML}</span>
    `
    calcFinalTotal();
}

function cartItems(){
    cartList.innerHTML = "";
    for(let i = 0; i < localStorage.length; i++){
        if(localStorage.key(i) == "Total price"){
            continue;
        }

        cartList.innerHTML += 
        `
            <li>
                <p><span>Item: </span><span>${localStorage.key(i)}<span><button class="btn btn-danger ms-3" onclick="removeFromCart(localStorage.key(${i}))">Remove from cart</button></p>
                <p><span>Price: </span><span>${localStorage.getItem(localStorage.key(i))}</span></p>
                <p><span>Quantity: </span><input class="qty" type="number" value="1" min="1" onkeyup="keyUp(this)"></p>
                <p><span><b>Total item price: </b><span class="totalPrice">${localStorage.getItem(localStorage.key(i))}</span></span></p>
                <hr>
            </li>
        `
    }
    calcFinalTotal();
}

function removeFromCart(key){
    localStorage.removeItem(key)
    cartItems();
    finalCheckout();
}

function finalCheckout(){
    if(finalTotal != 0){
        document.querySelector('#clearCart').addEventListener('click', ()=>{
            localStorage.clear();
            cartItems();
            document.querySelector('#totalItemPrice').innerHTML = "<b>You have no item in your cart.</b>";
            document.querySelector('#checkout').disabled = true;
            document.querySelector('#clearCart').disabled = true;
        })
    }
    else{
        document.querySelector('#totalItemPrice').innerHTML = "<b>You have no item in your cart.</b>";
        document.querySelector('#checkout').disabled = true;
        document.querySelector('#clearCart').disabled = true;
    }
}

cartItems();
finalCheckout();
localStorage.setItem("Total price", finalTotal);