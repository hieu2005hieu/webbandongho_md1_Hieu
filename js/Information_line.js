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
    window.location.href = "../html/index.html"
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





function render() {
    let data = JSON.parse(localStorage.getItem("bills"));
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let total = ``;
    let thongTinHTML = ""
    let filterData = data.filter(item => item.userId == currentUser.id)
    for (let i = 0; i < filterData.length; i++) {
        thongTinHTML = ""
        let cart = filterData[i].cart

        for (let j = 0; j < cart.length; j++) {
            if (j == cart.length - 1) {
                thongTinHTML +=
                    `
          <div>
            <img width="100px" src="${cart[j].img}" />
            <br/>
            <p>${cart[j].ten}</p>
            <p>GIÁ: ${Number(cart[j].gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <p>SỐ LƯỢNG: ${cart[j].quantity}</p>
          </div>
        `
            } else {
                thongTinHTML +=
                    `
              <div style="border-bottom: 1px solid black">
                <img width="100px" src="${cart[j].img}" />
                <br/>
                <p>${cart[j].ten}</p>
                <p>GIÁ: ${Number(cart[j].gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                <p>SỐ LƯỢNG: ${cart[j].quantity}</p>
              </div>
            `
            }
        }

        total += `
        <tr class="tr1">
          <td class="td1">${filterData[i].id}</td>
          <td class="td1">${filterData[i].address}</td>
          <td class="td1">${filterData[i].phone}</td>
          <td class="td1" >${thongTinHTML}</td>
          <td class="td1">${Number(filterData[i].totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
          <td class="td1">${filterData[i].status == 0 ? `<span style="color: green">Đang Chờ</span>` : filterData[i].status == 1 ? `<span style="color: blue">Xác nhận</span>` : `<span style="color: red">Từ chối</span>`}</td>
          <td class="td1">
             ${filterData[i].status == 0 ?
                `<button onclick="changeStatus(${i},2)">Hủy</button>` : ""}
          </td>
        </tr>
    `;
    }
    document.getElementById("table_Added").innerHTML = total;
}
render();

function changeStatus(index, status) {
    let accept = confirm("bạn muốn hủy đơn hàng không")
    if (accept) {
        let bills = JSON.parse(localStorage.getItem("bills"));
        bills[index].status = status;
        localStorage.setItem("bills", JSON.stringify(bills));
        handleSnackbar("Bạn Đã Hủy Đơn Hàng");
        render();
    }
}
function handleSnackbar(text) {
    const snackbar = document.createElement("div");
    snackbar.classList.add("snackbar");
    snackbar.innerText = text;
    document.body.appendChild(snackbar);
    setTimeout(() => {
        snackbar.remove();
    }, 3000);
}