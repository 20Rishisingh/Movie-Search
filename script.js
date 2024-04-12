const Products = [
   {id: 1, name: "Shirt", price:299},
   {id: 2, name: "T-Shirt", price:199},
   {id: 3, name: "Jeans", price:499},
   {id: 4, name: "Kurta", price:599},
];


let productItemList = document.querySelector(".product");
let cartItemList = document.querySelector(".box");
let para =document.querySelector(".msg");
let totalPrice = document.querySelector(".total")


function changequantity(e , count){
   e.target.parentNode.children[1].innerText = count
   let productName =  e.target.parentNode.parentNode.children[0].innerText;
   Products.forEach((prod) => {
      if(prod.name === productName){
         prod.count = count; 
      }
   });
    
   cartItemList.innerHTML = "";
   let total = 0;

   Products.forEach((ele)=>{
      if(ele.count > 0){
         let div = document.createElement("div");
         div.innerHTML = `
         <div >${ele.name}</div>
         <div class="price"><div>${ele.count}</div>
         <div>x</div>
         <div>${ele.price}</div></div>`
         
         div.classList.add('cartItem')
         cartItemList.appendChild(div);

         total += ele.count * ele.price
         totalPrice.innerHTML= ` Final Ammount = ₹${total}/- Only`;
      }
   });

   if (cartItemList.children.length === 0) {
      let para = document.createElement("p")
      para.innerHTML = `Please add some Items in cart`;
      para.style.fontSize ='25px'
      para.style.padding = '5rem 3rem'
      para.style.fontWeight = 'bold'
      cartItemList.appendChild(para);
      totalPrice.innerHTML= ` Final Ammount = 00/-`;
   }
}


productItemList.addEventListener('click', (e)=>{
   let count = 0;

   if(e.target.innerText === "+"){
      count = Number(e.target.parentNode.children[1].innerText)
      count++
      changequantity(e, count)
   }
   else if(e.target.innerText === "-"){
      count = Number(e.target.parentNode.children[1].innerText)
      if(count > 0){
         count--;
         changequantity(e, count)
      }
      else{
         alert("Item Quantity can not be negative");
      }
   }
});


function showproductList(){
   Products.forEach((e)=>{
      let div = document.createElement("div");

      div.innerHTML = `
         <div class="Name">${e.name}</div>
         <div class="rate"> ₹${e.price}/-</div>
         <div class="addorremoveBtn"> 
         <span class="minus"> - </span><p class="quantity"> 0 </p><span class="plus"> + </span>  </div>`
         div.classList.add("productstyle")
         productItemList.appendChild(div);
   })
}

window.onload = showproductList();