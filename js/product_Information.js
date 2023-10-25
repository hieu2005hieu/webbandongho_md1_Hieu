let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {}

if (currentUser.email) {
    let countItem = currentUser.cart.length
    let stringHTML
    if (currentUser.image) {
        stringHTML = `<img class="image_avatar" src="${currentUser.image}" alt="img"/>`
    } else {
        stringHTML = `<i class="fa-solid fa-user-large infor"></i>`
    }
    document.getElementById("card_login").innerHTML =
        `
        <div class="deregister" id="menu_info">
         <span style="color:#fff; font-size: 15px;"> Hello,${currentUser.username}</span>
            <a id="avatar_scope" onclick="toggleShowMenu()">${stringHTML}</a>
        </div>
        <a href="./cart.html"><i class="fa-brands fa-shopify cart cart">
        <span id="countItem" class="countItem">${countItem}</span>
        </i></a>
    `
} else {
    document.getElementById("card_login").innerHTML =
        `
        <div class="login">
            <a href=""><i class="fa-regular fa-user"></i></i></a>
            <a href="./login.html" class=" logins">Đăng nhập</a>
        </div>
    `
}
function toggleShowMenu() {
    document.getElementById("btn_info").classList.toggle("hidden")
}
function logout() {

    const users = JSON.parse(localStorage.getItem("users")) || []
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || []
    const index = users.findIndex(user => user.id == currentUser.id)
    users[index] = currentUser
    localStorage.setItem("users", JSON.stringify(users))

    localStorage.removeItem("currentUser")
    location.reload()
}

let dataIamge = ""
function changeAvatar() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {}
    // lay thong tin anh trong o input
    let file = document.getElementById("input_avatar").files[0]

    // khai bao mot doi tuong de ma hoa anh
    let reader = new FileReader();
    reader.onloadend = function () {
        // ket qua
        dataIamge = reader.result
        // gan ket qua cho anh tren man hinh
        document.getElementById("avatar_scope").innerHTML = `<img class="image_avatar" width="50px" src="${dataIamge}" />`
        // cap nhat thong tin user dang login
        currentUser.image = dataIamge
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
    }
    reader.readAsDataURL(file);
}




const idProductDetai = JSON.parse(localStorage.getItem("idProductDetail"))
const products = JSON.parse(localStorage.getItem("listProduct")) || []
const product = products.find(product => product.ID == idProductDetai)
document.getElementById("image").src = product.img
document.getElementById("name").innerHTML = product.ten 
document.getElementById("price").innerHTML = Number(product.gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
document.getElementById("category_title").innerHTML = product.category


function addToCart() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    handleSnackbar("Thêm vào Giỏ Hàng Thành Công");
    if (currentUser == null) {
        alert("Cần Đăng Nhập Tài Khoản Để Thêm Sản Phẩm")
        window.location.href = "./login.html"
    }

    let find_product = products.find((product) => product.ID === idProductDetai);
    let cart = currentUser.cart;
    let check = cart.find((product) => product.ID === idProductDetai);
    let users = JSON.parse(localStorage.getItem("users"));
    let index = users.findIndex((user) => user.id === currentUser.id)
    
    if (check) {
        check.quantity++;
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
    } else {
        cart.push({
            ...find_product,
            quantity: 1
        })
        
        users[index].cart = cart
        localStorage.setItem("users", JSON.stringify(users))
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
        document.getElementById("countItem").innerHTML = countItem;
    }
    document.getElementById("countItem").innerHTML = currentUser.cart.length
    handleSnackbar("Thêm vào Giỏ Hàng Thành Công");
}




function handleSnackbar(text) {
    const snackbar = document.createElement("div");
    snackbar.classList.add("snackbar");
    snackbar.innerText = text;
    document.body.appendChild(snackbar);
    setTimeout(() => {
        snackbar.remove();
    }, 4000);
}