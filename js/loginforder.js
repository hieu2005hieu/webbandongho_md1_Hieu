let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

if (currentUser.email) {
    document.getElementById("card_login").innerHTML =
        `
        <div class="deregister" id="menu_info">
         <span style="color:#fff; font-size: 15px;"> Hello: ${currentUser.username}</span>
        <a onclick="toggleShowMenu()"><i class="fa-solid fa-user-large infor"></i></a>
        
        <a class=" logins" onclick="logout()">Đăng xuất</a>
        </div>
        <a href="./cart.html"><i class="fa-brands fa-shopify cart cart infor"></i></a>
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
    location.reload();
}
