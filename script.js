


document.onload= getAllProducts()


function getProductById() {
    var id = document.getElementById("prod").value
    var xhr = new XMLHttpRequest()
    xhr.open("get", "https://fakestoreapi.com/products/" + id)
    // send request
    xhr.send()
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.response)
            var divContainer = document.getElementById("container")
            divContainer.innerHTML = ""
            display(response)
        }
    })

}

function getAllProducts() {
    var xhr = new XMLHttpRequest()
    xhr.open("get", 'https://fakestoreapi.com/products/')
    xhr.send()

    xhr.addEventListener("readystatechange", function () {
        console.log(xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
            // response recieved
            var response = JSON.parse(xhr.response)
            // display
            var divContainer = document.getElementById("container")
            divContainer.innerHTML = ""
            for (let i = 0; i < response.length; i++) {
                display(response[i])
            }
        }
    })
    var span = document.getElementById("itemcount")
    span.textContent=localStorage.length
}

function display(res) { //product
    var divContainer = document.getElementById("container")
    var title = res.title
    var price = res.price
    var imgPrd = res.image
    var id = res.id
    var divProd = createProduct(id, title, price, imgPrd)
    divContainer.innerHTML += divProd
}

function createProduct(id, title, price, imgPrd) {
    var divProd = `
   <div class='item'>
     <img src=${imgPrd}>
     <p>${title}</p>
     <h5>${price} <span>EGP</span></h5>
     <div>
       <input type='button' name=${id} onClick="addCart(event)" value="Add To Cart"/>
     </div>
   </div> 
   `
    return divProd
}

function addCart(e) {
    var span = document.getElementById("itemcount")
    localStorage.setItem("prod_id" + e.target.name, e.target.name)
    span.textContent=localStorage.length
}

function check(e) {
    if (e.target.value == false)
        getAllProducts()

}

