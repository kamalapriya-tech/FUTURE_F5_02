// Product data
const products = [
  { id: 1, name: "T-Shirt", price: 299, image:  "assets/img/t shirt.jpeg"},
  { id: 2, name: "Sneakers", price: 899, image: "assets/img/sneakers.jpeg" },
  { id: 3, name: "Backpack", price: 499, image: "assets/img/bag.jpeg" },
  { id: 4, name: "pant" ,price:300, image:"assets/img/pant.jpeg"},
  { id:5,name: "kurthi" ,price:450, image:"assets/img/kurthi.jpeg"},
  { id:6,name: "saree" ,price:750, image:"assets/img/saree.jpeg"},

];

// Run when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // === index.html ===
  const productList = document.getElementById("product-list");
  if (productList) {
    products.forEach(product => {
      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = `
        <div class="card mb-4">
          <img src="${product.image}" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">₹${product.price}</p>
            <button class="btn btn-success" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      `;
      productList.appendChild(col);
    });

    // Handle add to cart button click
    productList.addEventListener("click", function (e) {
      if (e.target.tagName === "BUTTON") {
        const id = Number(e.target.getAttribute("data-id"));
        const item = products.find(p => p.id === id);
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart!");
      }
    });
  }

  // === cart.html ===
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  if (cartItems && totalEl) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach(item => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between";
      li.textContent = `${item.name} - ₹${item.price}`;
      cartItems.appendChild(li);
      total += item.price;
    });

    totalEl.textContent = total;
  }

  // === checkout.html ===
  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    });
  }
});
