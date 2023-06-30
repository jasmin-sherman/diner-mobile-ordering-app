import { menuArray } from './data.js'
let cart = []
const submitForm = document.getElementById("submit-form")

document.addEventListener('click', function(e){
    if (e.target.dataset.id) {
        addItemToCart(e.target.dataset.id)
    } else if (e.target.dataset.remove) {
        handleRemove(e.target.dataset.remove)
    } else if (e.target.id === 'complete-btn') {
        handleCompleteOrder()
    }    
})

submitForm.addEventListener('submit', handleSubmit) 

function getMenuHtml() {
    let menuHtml = ``
    
    menuArray.forEach(function(menuItem){
        menuHtml += `
                <div class="menu-item">
                    <div class="item-details">
                        <img src="${menuItem.pic}" class="food-img">
                        <div class="menu-item-text">
                            <h2 class="name">${menuItem.name}</h2>
                            <p class="ingredients">${menuItem.ingredients}</p>
                            <p class="price">$${menuItem.price}</p>
                         </div>
                    </div>
                    <button class="add-btn" id="add-btn" data-id="${menuItem.id}">+</button>
                </div>
            `      
    })
    return menuHtml
}

function render() {
    document.getElementById('menu').innerHTML = getMenuHtml()
}    

render()

function addItemToCart(itemId) {
    cart.push(itemId)
    showCart()
}

function showCart() {
    
    let order = ''
    let total = 0
    
    cart.forEach(function(itemId, i){
        const cartItem = menuArray.find(function(menuItemObj){
            return itemId == menuItemObj.id
        })
        order += `
            <div class="order-details">
                <div class="item-name-with-remove">
                    <p class="cart-item-name">${cartItem.name}</p>
                    <button class="remove-btn" data-remove="${i}">remove</button>
                </div>
                <p class="cart-item-price">$${cartItem.price}</p>
            </div> 
        `
        total += cartItem.price
    })
        let orderDetails = `  
            <div class="your-order">
                <h2 class="order-header">Your order</h2>
                <div>
                    ${order} 
                </div>
                <div class="total-price">
                    <p>Total price:</p>
                    <p>$${total}</p>
                </div>
                <button class="complete-btn" id="complete-btn">Complete order</button>
            </div>
        `
        document.getElementById('order').innerHTML = orderDetails
}

function handleRemove(i) {
    cart.splice(Number(i), 1)
    showCart()
}

function handleCompleteOrder() {
    const modal = document.getElementById('modal')
    modal.style.display = 'inline'
}

function handleSubmit(e) {
    e.preventDefault()
    // modal disappears
    const modal = document.getElementById('modal')
    modal.style.display = 'none'
    // the name is stored somewhere
    const data = new FormData(submitForm) 
    const name = data.get('name') 
    // the order section is removed 
    document.getElementById('order').innerHTML = ''
    cart = []
     // "thanks, name" text is added to main page
    let thanksMessage = `
        <div class="thanks-message">
            <p>Thanks, ${name}! Your order is on its way!</p>
        </div>`
    
     document.getElementById('order').innerHTML = thanksMessage
   
}
