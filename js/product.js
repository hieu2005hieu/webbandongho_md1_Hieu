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

// if (user.cart.length==0){
//     document.getElementById("countItem").style.display="none"
// }








let imgse = ""
let currentPage = 1;     // trang hien tai
let itemPerPage = 6;
function renderCategory() {
    const category = JSON.parse(localStorage.getItem("category"))
    let stringHTML =
        `
  <div>
    <span style="cursor: pointer" onclick="filterProduct()">Tất Cả Sản Phẩm</span>
  </div>
  `
    for (let i = 0; i < category.length; i++) {
        stringHTML +=
            `
    <div>
        <span class="category_name" onclick="filterProduct('${category[i].name}')">${category[i].name}</span>
    </div>
    `
    }
    document.getElementById("category").innerHTML = stringHTML
}
renderCategory()
// phan tu ket thuc
//tong so item tren 1 trang
let listProduct = JSON.parse(localStorage.getItem("listProduct")) || {};
let totalPage = Math.ceil(listProduct.length / itemPerPage);
let data

function search() {

    let products = JSON.parse(localStorage.getItem("listProduct"));
    let searchValue = document.getElementById("product_search").value;
    let searchProduct = products.filter((item) => {
        return item.ten.toLowerCase().includes(searchValue.toLowerCase());
        // return item.ten.toLowerCase().startsWith(searchValue.toLowerCase())

    });
    data = searchProduct
    render(data);
}
function filterProduct(category) {
    document.getElementById("product_search").value = "";
    const products = JSON.parse(localStorage.getItem("listProduct")) || []
    if (category) {
        data = products.filter(item => item.category == category)
    } else {
        data = products
    }
    render(data)
}
// renderlistpage so trang
function renderListPage() {
    let button = ""
    for (let i = 1; i <= totalPage; i++) {
        button +=
            `
            <button onclick="choosePage(${i})" class="buttomPage">${i}</button>
            `
    } document.getElementsByClassName("btn_pagination")[0].innerHTML = button;
    document.getElementsByClassName("buttomPage")[0].classList.add("image-card-choose")
}

function choosePage(nowPage) {
    currentPage = nowPage;
    render(data)
    imgse = nowPage
    let imagenow = document.getElementsByClassName("buttomPage")
    for (let i = 0; i < imagenow.length; i++) {
        if (i + 1 == nowPage) {
            imagenow[i].classList.add("image-card-choose");
        } else {
            imagenow[i].classList.remove("image-card-choose");
        }
    }
}

renderListPage();
//function render san pham
function render(data) {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    if (!data) {
        data = JSON.parse(localStorage.getItem("listProduct")) || [];
    }
    // sap xep theo gia
    // data.sort((a, b) => a.gia - b.gia)
    // sap xep theo ten
    // data.sort((a, b) => a.ten.localeCompare(b.ten))
    const dataToShow = data.slice(startIndex, endIndex);
    let total = "";
    for (let i = 0; i < dataToShow.length; i++) {
        total += `
   <div class="title-img">
      <div class="frame-img" style="width: 300px; height: 300px; overflow: hidden;" onclick="gotoProductDetail(${data[i].ID})">
        <img class="img-product" src="${dataToShow[i].img}" alt="anh">
      </div>
      <h5 onclick="gotoProductDetail(${dataToShow[i].ID})">${dataToShow[i].ten}</h5>
      <p> ${Number(dataToShow[i].gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
      <button onclick="buy(${dataToShow[i].ID})">Thêm Vào Giỏ Hàng</button>
   </div>
   `;
    }
    document.getElementById("box-img").innerHTML = total;
}
render(listProduct);




function rendernext() {
    if (currentPage < totalPage) {
        currentPage++;
        choosePage(currentPage);
    }
}
function renderpre() {
    if (currentPage > 1) {
        currentPage--;
        choosePage(currentPage)
    }
}













function gotoProductDetail(id) {
    localStorage.setItem("idProductDetail", id)
    window.location.href = "Product_information.html"
}



let products = JSON.parse(localStorage.getItem("listProduct"))
function buy(id) {
    handleSnackbar("Thêm vào Giỏ Hàng Thành Công");
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser == null) {
        alert("Cần Đăng Nhập Tài Khoản Để Thêm Sản Phẩm")
        window.location.href = "./login.html"
    }
    let find_product = products.find((product) => product.ID === id);
    let cart = currentUser.cart;
    let check = cart.find((product) => product.ID === id);
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
        handleSnackbar("Thêm vào Giỏ Hàng Thành Công");
    }
    document.getElementById("countItem").innerHTML = currentUser.cart.length
}

function handleSnackbar(text) {
    const snackbar = document.createElement("div");
    snackbar.classList.add("snackbar");
    snackbar.innerText = text;
    document.body.appendChild(snackbar);
    setTimeout(() => {
        snackbar.remove();
    }, 2000);
}
















