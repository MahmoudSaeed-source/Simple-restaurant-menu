import food from "./data.js";
let products_Container = document.querySelector(".products_Container");
let  products_Category = document.querySelector(".products_Category");
let products_Cart_Line = document.querySelector(".products_Cart_Line");
let cart_Container = document.querySelector(".cart_Container")
let Total_price = document.querySelector(".Total_price")
let single_Category = [];
let Btn_Add_To_Cart = [];
let products_In_Cart = [];





// start add to cart function
function initializeBtnAddToCart(products) {
  Btn_Add_To_Cart = document.querySelectorAll(".add_To_Cart");
  Btn_Add_To_Cart.forEach((Btn) => {
    Btn.addEventListener("click", (e) => {
      let getProduct = products.find((p) => p.id === +Btn.dataset.id);
      const productInCart = products_In_Cart.find((element) => element.id === +Btn.dataset.id);
      if(!productInCart) {
           getProduct.quantity = 1
        products_In_Cart.push(getProduct)
      } else {
            getProduct.quantity ++
      }
      get_All_products_In_Cart(products_In_Cart)
        
    });
  });
}
// // end add to cart function



//  start get All category from data
  (function getTitles() {
  for(let category in food) {
    products_Category.innerHTML += ` <li class="single_Category">${category}</li> `
    }
     single_Category = document.querySelectorAll(".single_Category");
})();
//  end get All category from data

//start  but products in Dom when open the website
get_Data_firstly() 
function get_Data_firstly() {
  let products = food.meat;
    products.forEach((product) => {
        products_Container.innerHTML +=
          `
           <div class="single_Product_Card">
      <h4 class="product_Name">${product.name}</h4>
      <div class="image_Container">
        <img src = "${product.urlImage}" alt="image">
      </div>
      <p class="description">
      ${product.description}
      </p>
      <h4 class="price_Content">
         $ ${product.price}
      </h4>
      <h6 class = "add_To_Cart" data-id = ${product.id}   ><i class="fa-solid fa-cart-shopping"></i> cart</h6>
    </div>`
          
      })
         initializeBtnAddToCart(products) 
}

// start push products from category to Dom
    single_Category.forEach((title) => {
      title.addEventListener("click",() => {       
        products_Container.innerHTML = "";
      let category = title.innerHTML
       let products = food[category];
      products.forEach((product) => {
        products_Container.innerHTML +=
          `
           <div class="single_Product_Card">
      <h4 class="product_Name">${product.name}</h4>
      <div class="image_Container">
        <img src = "${product.urlImage}" alt="image">
      </div>
      <p class="description">
      ${product.description}
      </p>
      <h4 class="price_Content">
         $ ${product.price}
      </h4>
      <h6 class = "add_To_Cart" data-id = ${product.id}   >Add To cart</h6>
    </div>`
          
      })
         initializeBtnAddToCart(products) 
      })
      
    })
// end push products from category to Dom
  


// start get all products from cart to Dom 
function get_All_products_In_Cart(products_In_Cart) {
   products_Cart_Line.innerHTML = ""
  products_In_Cart.forEach(ele => {
 products_Cart_Line.innerHTML +=`<li class="product_In_cart" >
        <div class="image_container">
          <img src="${ele.urlImage} " alt="product-image">
        </div>
        <h6 class="product_In_cart_Name">${ele.name} </h6>
        <div class="counter">
          <span class="mark markDown" data-id = ${ele.id}>-</span>
          <span class="counter_items" data-id=${ele.id} >${ele.quantity}</span>
          <span class="mark markUp" data-id="${ele.id}" >+</span>
        </div >
        <h5 class="price_Product_in_Cart" >$ ${ele.quantity*ele.price}</h5>
        <div class="delete_Product_From_Cart" data-id =${ele.id}><i class="fa-solid fa-xmark"></i></div>
      </li>`
  })
  let increment_Btn = document.querySelectorAll(".markUp");
  let decrement_Btn = document.querySelectorAll(".markDown");
  let quantity_Input = document.querySelectorAll(".counter_items");
  let price_Dom = document.querySelectorAll(".price_Product_in_Cart")
  increment(increment_Btn,quantity_Input,price_Dom)
  decrement(decrement_Btn,quantity_Input,price_Dom)
  delete_Product()
  totalPriceDom()

}
// End get all products from cart to Dom 
// start increment function for each product
function  increment(Btn,quantityDom,price_Dom){
    Btn.forEach((ele) => {
      ele.addEventListener("click",(e) => {
        let product = +e.target.dataset.id;
        let getProduct = products_In_Cart.find((ele,index) => ele.id === product)
        getProduct.quantity++;
        totalPriceDom()
        quantityDom.forEach((quantityDomElement,index) => {
          let ProductId = getProduct.id
          let quantityDomElementId = +quantityDomElement.dataset.id
          let price_Dom_Input = price_Dom[index];
          if(quantityDomElementId === ProductId) {
            quantityDomElement.innerHTML = getProduct.quantity
            price_Dom_Input.innerHTML = `$ ${getProduct.price * getProduct.quantity}`
          }
        })
      })
    })
  
}
// end increment function for each product

// start decrement function for each product
function decrement(Btn,quantityDom,price_Dom) {
    Btn.forEach((ele) => {
      ele.addEventListener("click",(e) => {
        let product = +e.target.dataset.id;
        let getProduct = products_In_Cart.find((ele) => ele.id === product)
        let productIndex = products_In_Cart.indexOf(getProduct)
        if(getProduct.quantity > 1) {
           getProduct.quantity--;
        } else {
          products_In_Cart.splice(productIndex,1)
          get_All_products_In_Cart(products_In_Cart)
         
        }
       totalPriceDom()
        quantityDom.forEach((quantityDomElement,index) => {
          let ProductId = getProduct.id
          let quantityDomElementId = +quantityDomElement.dataset.id
          let price_Dom_Input = price_Dom[index];
          if(quantityDomElementId === ProductId) {
            quantityDomElement.innerHTML = getProduct.quantity
            price_Dom_Input.innerHTML = `$ ${getProduct.price * getProduct.quantity}`
          }
        })
      })
    })
  
}

// end decrement function for each product

// start delete Product from Cart 
function delete_Product() {
  let LiDom = document.querySelectorAll(".product_In_cart")
  let delete_Product_From_Cart = document.querySelectorAll(".delete_Product_From_Cart")
  delete_Product_From_Cart.forEach((Btn) => {
    Btn.addEventListener("click",() => {
      let btnId = +Btn.dataset.id
      let getProduct = products_In_Cart.find((ele) => ele.id === btnId)
      let productIndex = products_In_Cart.indexOf(getProduct)
      products_In_Cart.splice(productIndex,1)
      get_All_products_In_Cart(products_In_Cart)
         totalPriceDom()
    })
  })
 
}
// End delete Product from Cart

//  start get_Total_price
function totalPriceDom() {
  let totalPrice_Product_In_Cart = products_In_Cart.reduce((currentPrice,item) => currentPrice + (item.price*item.quantity),0);
  Total_price.innerHTML = ` total price : $ ${totalPrice_Product_In_Cart}`;
}