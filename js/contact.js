let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

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