// =========================
// CART
// =========================

let cart =
    JSON.parse(localStorage.getItem("rentEasyCart")) || [];

updateCartCount();


// =========================
// ADD TO CART
// =========================

function addToCart(productName, price) {

    let product = {
        name: productName,
        price: price
    };

    cart.push(product);

    localStorage.setItem(
        "rentEasyCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(productName + " added to your cart!");
}
// function addToCart(productName, price) {

//     let product = {
//         name: productName,
//         price: price,
//         duration: 1,
//         quantity: 1
//     };

//     cart.push(product);

//     localStorage.setItem(
//         "rentEasyCart",
//         JSON.stringify(cart)
//     );

//     updateCartCount();

//     alert(productName + " added to your cart!");
// }

// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {

    let cartCount =
        document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}


// =========================
// HOME PAGE
// =========================

function scrollToFurniture() {

    let furnitureSection =
        document.getElementById("furniture");

    if (furnitureSection) {

        furnitureSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// =========================
// CATEGORY
// =========================

function filterFurniture(category) {

    window.location.href =
        "furniture.html?category=" + category;

}


// =========================
// SEARCH + FILTER
// =========================

function filterProducts() {

    let searchInput =
        document.getElementById("searchInput");

    let categoryFilter =
        document.getElementById("categoryFilter");

    let priceFilter =
        document.getElementById("priceFilter");


    if (!searchInput ||
        !categoryFilter ||
        !priceFilter) {

        return;

    }


    let searchText =
        searchInput.value.toLowerCase();

    let selectedCategory =
        categoryFilter.value;

    let selectedPrice =
        priceFilter.value;


    let products =
        document.querySelectorAll(".product-card");


    let visibleProducts = 0;


    products.forEach(function(product) {

        let name =
            product.getAttribute("data-name")
                .toLowerCase();

        let category =
            product.getAttribute("data-category");

        let price =
            Number(
                product.getAttribute("data-price")
            );


        let matchesSearch =
            name.includes(searchText);


        let matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;


        let matchesPrice =
            selectedPrice === "all" ||
            price <= Number(selectedPrice);


        if (
            matchesSearch &&
            matchesCategory &&
            matchesPrice
        ) {

            product.style.display = "block";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    let noResults =
        document.getElementById("noResults");


    if (noResults) {

        if (visibleProducts === 0) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    }

}


// =========================
// SORT PRODUCTS
// =========================

function sortProducts() {

    let container =
        document.getElementById("productContainer");

    let sortFilter =
        document.getElementById("sortFilter");


    if (!container || !sortFilter) {
        return;
    }


    let products =
        Array.from(
            container.querySelectorAll(".product-card")
        );


    let sortValue =
        sortFilter.value;


    if (sortValue === "low") {

        products.sort(function(a, b) {

            return Number(
                a.dataset.price
            ) -
            Number(
                b.dataset.price
            );

        });

    }


    else if (sortValue === "high") {

        products.sort(function(a, b) {

            return Number(
                b.dataset.price
            ) -
            Number(
                a.dataset.price
            );

        });

    }


    else if (sortValue === "name") {

        products.sort(function(a, b) {

            return a.dataset.name.localeCompare(
                b.dataset.name
            );

        });

    }


    products.forEach(function(product) {

        container.appendChild(product);

    });


    filterProducts();

}



// =========================
// PRODUCT DATA
// =========================

const products = {

    sofa: {
        name: "Modern Sofa",
        price: 1499,
        image: "asst/sofa.jpg",
        description:
            "Comfortable 3-seater sofa perfect for your living room."
    },

    bed: {
        name: "King Size Bed",
        price: 1299,
        image: "asst/bed.jpg",
        description:
            "Spacious and comfortable king size bed for a peaceful sleep."
    },

    "dining-table": {
        name: "Dining Table",
        price: 899,
        image: "asst/dining-table.jpg",
        description:
            "Elegant dining table suitable for family meals."
    },

    "office-chair": {
        name: "Office Chair",
        price: 699,
        image: "asst/office-chair.jpg",
        description:
            "Comfortable office chair designed for your workspace."
    },

    "study-table": {
        name: "Study Table",
        price: 599,
        image: "asst/studytable.jpg",
        description:
            "Simple and practical study table for students and professionals."
    },

    wardrobe: {
        name: "Wooden Wardrobe",
        price: 999,
        image: "asst/wardboard.webp",
        description:
            "Spacious wardrobe for keeping your clothes organized."
    }

};


// =========================
// LOAD PRODUCT
// =========================

function loadProduct() {

    let params =
        new URLSearchParams(window.location.search);

    let productId =
        params.get("product");

    let product =
        products[productId];

    if (!product) {
        return;
    }


    document.getElementById("productImage").src =
        product.image;

    document.getElementById("productImage").alt =
        product.name;

    document.getElementById("productName").textContent =
        product.name;

    document.getElementById("productDescription").textContent =
        product.description;

    document.getElementById("productPrice").textContent =
        "₹" + product.price.toLocaleString("en-IN") +
        " / month";


    // Save selected product

    window.selectedProduct = product;


    calculateTotal();

}


// =========================
// CALCULATE TOTAL
// =========================

function calculateTotal() {

    if (!window.selectedProduct) {
        return;
    }

    let duration =
        Number(
            document.getElementById("rentalDuration").value
        );

    let total =
        window.selectedProduct.price *
        duration *
        quantity;


    document.getElementById("totalPrice").textContent =
        "₹" + total.toLocaleString("en-IN");

}


// =========================
// ADD PRODUCT TO CART
// =========================

function addProductToCart() {

    if (!window.selectedProduct) {
        return;
    }


    let duration =
        Number(
            document.getElementById("rentalDuration").value
        );


    let product = {

        name: window.selectedProduct.name,

        price: window.selectedProduct.price,

        duration: duration,

        quantity: quantity,

        total:
            window.selectedProduct.price *
            duration *
            quantity

    };


    cart.push(product);


    localStorage.setItem(
        "rentEasyCart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(
        window.selectedProduct.name +
        " added to your cart!"
    );

}

// =========================
// OPEN PRODUCT DETAILS
// =========================

function openProduct(product) {

    window.location.href =
        "product-details.html?product=" + product;

}


// Load product details when page opens

if (
    document.getElementById("productName")
) {
    loadProduct();
}



// =========================
// LOAD CART PAGE
// =========================

function loadCart() {

    let cartContainer =
        document.getElementById("cartContainer");

    let emptyCart =
        document.getElementById("emptyCart");

    let cartSummary =
        document.getElementById("cartSummary");

    if (!cartContainer) {
        return;
    }

    if (cart.length === 0) {

        emptyCart.style.display = "block";
        cartSummary.style.display = "none";

        return;
    }

    emptyCart.style.display = "none";
    cartSummary.style.display = "block";

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach(function(item, index) {

        let itemTotal =
            item.price *
            (item.duration || 1) *
            (item.quantity || 1);

        total += itemTotal;


        let cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>
                    Monthly Price:
                    ₹${item.price}
                </p>

                <p>
                    Rental Duration:
                    ${item.duration || 1} month(s)
                </p>

            </div>


            <div class="cart-controls">

                <button
                    onclick="decreaseCartQuantity(${index})">
                    -
                </button>


                <span>
                    ${item.quantity || 1}
                </span>


                <button
                    onclick="increaseCartQuantity(${index})">
                    +
                </button>


                <strong>
                    ₹${itemTotal.toLocaleString("en-IN")}
                </strong>


                <button
                    class="remove-button"
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </div>

        `;


        cartContainer.appendChild(cartItem);

    });


    document.getElementById("cartTotal").textContent =
        "₹" + total.toLocaleString("en-IN");
}


// =========================
// INCREASE CART QUANTITY
// =========================

function increaseCartQuantity(index) {

    cart[index].quantity =
        (cart[index].quantity || 1) + 1;

    saveCart();

    loadCart();
}


// =========================
// DECREASE CART QUANTITY
// =========================

function decreaseCartQuantity(index) {

    if ((cart[index].quantity || 1) > 1) {

        cart[index].quantity--;

        saveCart();

        loadCart();
    }
}


// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    updateCartCount();

    loadCart();
}


// =========================
// SAVE CART
// =========================

function saveCart() {

    localStorage.setItem(
        "rentEasyCart",
        JSON.stringify(cart)
    );
}


// =========================
// CHECKOUT
// =========================

function proceedToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    window.location.href =
        "checkout.html";
}


// =========================
// LOAD CART PAGE
// =========================

if (
    document.getElementById("cartContainer")
) {

    loadCart();

}




// =========================
// LOAD CHECKOUT PAGE
// =========================

function loadCheckout() {

    let checkoutItems =
        document.getElementById("checkoutItems");

    let checkoutTotal =
        document.getElementById("checkoutTotal");

    if (!checkoutItems) {
        return;
    }

    if (cart.length === 0) {

        checkoutItems.innerHTML =
            "<p>Your cart is empty.</p>";

        checkoutTotal.textContent = "₹0";

        return;
    }


    checkoutItems.innerHTML = "";

    let total = 0;


    cart.forEach(function(item) {

        let duration =
            item.duration || 1;

        let quantity =
            item.quantity || 1;

        let itemTotal =
            item.price *
            duration *
            quantity;

        total += itemTotal;


        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price} ×
                    ${duration} month(s) ×
                    ${quantity}
                </p>

                <strong>
                    ₹${itemTotal.toLocaleString("en-IN")}
                </strong>

            </div>

        `;

    });


    checkoutTotal.textContent =
        "₹" + total.toLocaleString("en-IN");
}


// =========================
// PLACE ORDER
// =========================

function placeOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        window.location.href =
            "furniture.html";

        return;
    }


    let customerName =
        document.getElementById(
            "customerName"
        ).value;


    let customerEmail =
        document.getElementById(
            "customerEmail"
        ).value;


    let customerPhone =
        document.getElementById(
            "customerPhone"
        ).value;


    let customerAddress =
        document.getElementById(
            "customerAddress"
        ).value;


    let customerCity =
        document.getElementById(
            "customerCity"
        ).value;


    let customerPincode =
        document.getElementById(
            "customerPincode"
        ).value;


    let paymentMethod =
        document.getElementById(
            "paymentMethod"
        ).value;


    let order = {

        customerName: customerName,

        customerEmail: customerEmail,

        customerPhone: customerPhone,

        customerAddress: customerAddress,

        customerCity: customerCity,

        customerPincode: customerPincode,

        paymentMethod: paymentMethod,

        products: cart,

        orderDate: new Date().toLocaleString()

    };


    localStorage.setItem(
        "rentEasyOrder",
        JSON.stringify(order)
    );


    // Clear cart

    localStorage.removeItem(
        "rentEasyCart"
    );


    cart = [];

    updateCartCount();


    // Go to confirmation page

    window.location.href =
        "order-confirmation.html";
}


// =========================
// LOAD CHECKOUT
// =========================

if (
    document.getElementById("checkoutItems")
) {

    loadCheckout();

}




/* =========================
   LOAD ORDER CONFIRMATION
========================= */

function loadOrderConfirmation() {

    let order =
        JSON.parse(
            localStorage.getItem("rentEasyOrder")
        );


    // Check whether an order exists

    if (!order || !order.products) {

        document.getElementById("orderId").textContent =
            "No order found";

        document.getElementById("confirmationItems").innerHTML =
            "<p>Order information is unavailable.</p>";

        return;

    }


    // Display the saved order ID

    let orderId =
        order.orderId || "RE" + Date.now();

    document.getElementById("orderId").textContent =
        orderId;


    // Display order date

    document.getElementById("orderDate").textContent =
        order.orderDate || "";


    // Display customer details

    document.getElementById("customerName").textContent =
        order.customerName || "";

    document.getElementById("customerEmail").textContent =
        order.customerEmail || "";

    document.getElementById("customerPhone").textContent =
        order.customerPhone || "";


    let address =
        (order.customerAddress || "") +
        ", " +
        (order.customerCity || "") +
        " - " +
        (order.customerPincode || "");

    document.getElementById("customerAddress").textContent =
        address;


    document.getElementById("paymentMethod").textContent =
        order.paymentMethod || "";


    // Display products

    let items =
        document.getElementById(
            "confirmationItems"
        );

    items.innerHTML = "";

    let total = 0;


    order.products.forEach(function(item) {

        let duration =
            Number(item.duration) || 1;

        let quantity =
            Number(item.quantity) || 1;

        let itemTotal =
            Number(item.price) *
            duration *
            quantity;

        total += itemTotal;


        let itemDiv =
            document.createElement("div");

        itemDiv.className =
            "confirmation-item";


        itemDiv.innerHTML = `

            <strong>${item.name}</strong>

            <p>
                ₹${Number(item.price).toLocaleString("en-IN")}
                × ${duration} month(s)
                × ${quantity}
            </p>

            <strong>
                ₹${itemTotal.toLocaleString("en-IN")}
            </strong>

        `;


        items.appendChild(itemDiv);

    });


    // Display total

    document.getElementById(
        "confirmationTotal"
    ).textContent =
        "₹" + total.toLocaleString("en-IN");


    // Update cart count

    updateCartCount();

}


/* =========================
   LOAD CONFIRMATION PAGE
========================= */

if (
    document.getElementById("orderId")
) {

    loadOrderConfirmation();

}



// =========================
// USER REGISTRATION
// =========================

let registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            let name =
                document.getElementById(
                    "registerName"
                ).value.trim();

            let email =
                document.getElementById(
                    "registerEmail"
                ).value.trim().toLowerCase();

            let password =
                document.getElementById(
                    "registerPassword"
                ).value;

            let confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;

            let message =
                document.getElementById(
                    "registerMessage"
                );


            // Check password match

            if (password !== confirmPassword) {

                message.textContent =
                    "Passwords do not match.";

                message.style.color = "red";

                return;

            }


            // Get existing users

            let users =
                JSON.parse(
                    localStorage.getItem(
                        "rentEasyUsers"
                    )
                ) || [];


            // Check whether email already exists

            let existingUser =
                users.find(function(user) {

                    return user.email === email;

                });


            if (existingUser) {

                message.textContent =
                    "This email is already registered.";

                message.style.color = "red";

                return;

            }


            // Create new user

            let newUser = {

                name: name,

                email: email,

                password: password

            };


            users.push(newUser);


            // Save users

            localStorage.setItem(
                "rentEasyUsers",
                JSON.stringify(users)
            );


            message.textContent =
                "Registration successful! Redirecting...";

            message.style.color = "green";


            setTimeout(function() {

                window.location.href =
                    "login.html";

            }, 1000);

        }
    );

}


// =========================
// USER LOGIN
// =========================

let loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            let email =
                document.getElementById(
                    "loginEmail"
                ).value.trim().toLowerCase();

            let password =
                document.getElementById(
                    "loginPassword"
                ).value;

            let message =
                document.getElementById(
                    "loginMessage"
                );


            // Get registered users

            let users =
                JSON.parse(
                    localStorage.getItem(
                        "rentEasyUsers"
                    )
                ) || [];


            // Find matching user

            let user =
                users.find(function(user) {

                    return user.email === email &&
                           user.password === password;

                });


            if (!user) {

                message.textContent =
                    "Invalid email or password.";

                message.style.color = "red";

                return;

            }


            // Save login session

            localStorage.setItem(
                "rentEasyLoggedIn",
                "true"
            );


            localStorage.setItem(
                "rentEasyCurrentUser",
                JSON.stringify(user)
            );


            message.textContent =
                "Login successful! Redirecting...";

            message.style.color = "green";


            setTimeout(function() {

                window.location.href =
                    "index.html";

            }, 700);

        }
    );

}