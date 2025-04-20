document.addEventListener("DOMContentLoaded", () => {
    const navigation_bar = document.querySelector(".nav");
    // Function to update width
    function updateNavWidth() {
        navigation_bar.style.width = `${document.documentElement.clientWidth}px`;
    }
    // Set initial width
    updateNavWidth();
    // Update width on window resize
    window.addEventListener("resize", updateNavWidth);
});

const items_section = document.querySelector(".items");

// Creating a function to add items
function addItems(i) {
    const card = document.createElement('div');
    card.classList.add("card");
    const image = document.createElement("img");
    image.src = "books.jpeg";
    const title = document.createElement("h2");
    title.innerHTML = items[i].title;
    const description = document.createElement("p");
    description.innerHTML = items[i].desc;
    const section = document.createElement("section");
    const price = document.createElement("div");
    price.classList.add("price");
    price.setAttribute("rate", items[i].price);
    price.innerHTML = `Rs. ${items[i].price}`;
    const qtyDiv = document.createElement('div');
    qtyDiv.className = 'qty';
    const quantityLabel = document.createElement('div');
    quantityLabel.textContent = 'Quantity';
    const decrementBtn = document.createElement('button');
    decrementBtn.classList.add("dec", "add-del");
    decrementBtn.textContent = '-';
    const numDiv = document.createElement('div');
    numDiv.className = 'num';
    numDiv.textContent = '0';
    const incrementBtn = document.createElement('button');
    incrementBtn.classList.add("inc", "add-del");
    incrementBtn.textContent = '+';

    qtyDiv.append(quantityLabel);
    qtyDiv.append(decrementBtn);
    qtyDiv.append(numDiv);
    qtyDiv.append(incrementBtn);
    section.append(price);
    section.append(qtyDiv);
    card.append(image);
    card.append(title);
    card.append(description);
    card.append(section)
    items_section.append(card);
};

items.forEach((con, index) => {
    addItems(index);
});

// Add to CART Function
const cart_count = document.getElementById("cartCount");
const add_to_carts = document.querySelectorAll(".add-del");
add_to_carts.forEach((e) => {
    e.addEventListener("click", () => {
        const qtyDiv = e.closest(".qty"); // Find the parent .qty div
        const numElement = qtyDiv.querySelector(".num"); // Find the .num sibling
        if (e.classList.contains("inc")) {
            cart_count.innerHTML = parseInt(cart_count.innerHTML) + 1;
            numElement.innerHTML = parseInt(numElement.innerHTML) + 1;
        }
        else if (parseInt(numElement.innerHTML) > 0) {
            cart_count.innerHTML = parseInt(cart_count.innerHTML) - 1;
            numElement.innerHTML = parseInt(numElement.innerHTML) - 1;
        }
    });
});

// Cart button
const cart = document.querySelector(".cart-icon-container");
const cartTableBody = document.querySelector(".cart-table tbody");
const cartTableFoot = document.querySelector(".cart-table tfoot");
const pop_up = document.getElementById("black");
cart.addEventListener("click", () => {
    let price = 0;
    const all_items_card = document.querySelectorAll(".card");
    all_items_card.forEach((e) => {
        const rate = e.querySelector(".price").getAttribute("rate");
        const quantity = parseInt(e.querySelector(".num").innerHTML);
        price += rate*quantity;

        // Adding into shopping list
        if(quantity != 0) {
            const row = document.createElement("tr");
            const itemName = document.createElement("td");
            itemName.innerHTML = e.querySelector("h2").textContent;
            const quantityItem = document.createElement("td");
            quantityItem.innerHTML = e.querySelector(".num").innerHTML;
            const rateItem = document.createElement("td");
            rateItem.innerHTML = `Rs. ${e.querySelector(".price").getAttribute("rate")}`;
            const totalPriceItem = document.createElement("td");
            totalPriceItem.innerHTML = `Rs. ${rate*quantity}`;
            row.append(itemName, quantityItem, rateItem, totalPriceItem);
            cartTableBody.append(row);
        }
    })
    console.log(`You have to pay : Rs. ${price}`);
    const footers = cartTableFoot.querySelectorAll(".f");
    footers[0].innerHTML = `Rs. ${price}`;
    const tax = 5/100*price;
    footers[1].innerHTML = `Rs. ${tax}`;
    footers[2].innerHTML = `Rs. ${price+tax}`;

    window.scrollTo(0, 0);
    pop_up.style.display = "flex";
    document.body.style.overflow = "hidden";
});

// Close pop-up
document.getElementById("close").addEventListener("click", ()=>{
    pop_up.style.display = "none";
    document.body.style.overflow = "auto";
})