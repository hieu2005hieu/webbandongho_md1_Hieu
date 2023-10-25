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
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || []
    const index = users.findIndex(user => user.id == currentUser.id)
    // finindex tra ra vi tri của phàn tử trong mảng theo từng phần tử.id = id của curuser
    users[index] = currentUser
    // lưu cart
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
let address = document.getElementById("address");
let addressError = document.getElementById("addressError");
let phoneError = document.getElementById("phoneError");
let phone = document.getElementById("phone");



let totalPrice = 0
function renderCart() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    let cart = currentUser.cart;
    let stringHTML = ""; totalPrice = 0
    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].gia * cart[i].quantity
        stringHTML +=
            `
        <tr>
            <td>
                <img width="100px" src="${cart[i].img}" alt="">
            </td>
            <td>
                <p>${cart[i].ten}</p>
            </td>
            <td>${Number(cart[i].gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </td>
            <td>
                <div class="div_btn">
                    <button onclick="changeStatus('${i}', 0)">-</button>
                    <span>${cart[i].quantity}</span>
                    <button onclick="changeStatus('${i}', 1)">+</button>
                </div>
            </td>
            <td>${Number(cart[i].gia * cart[i].quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            <td>
                <button style="min-width: 50px;" onclick="remove(${i})">Xóa</button>
            </td>
        </tr>
        `
    }
    document.getElementById("table_body").innerHTML = stringHTML;
    document.getElementById("total_price").innerHTML = Number(totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("total_price_1").innerHTML = Number(totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("countItem").innerHTML = currentUser.cart.length
}
renderCart();

function changeStatus(index, status) {
    const products = JSON.parse(localStorage.getItem("listProduct"));
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let cartUser = currentUser.cart;
    let product = products.find(item => item.ID == cartUser[index].ID)
    if (status == 0) {
        if (cartUser[index].quantity - 1 > 0) {
            cartUser[index].quantity -= 1
        }
    } else {
        if (cartUser[index].quantity + 1 <= product.soluong) {
            cartUser[index].quantity += 1
        }
        if (cartUser[index].quantity == product.soluong) {
            handleSnackbar("Sản phẩm đã hết");
        }
    }
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    renderCart()
}
function remove(index) {
    let accept = confirm("Bạn có muốn xóa sản phẩm không ?")
    if (accept) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let cartUser = currentUser.cart;
        cartUser.splice(index, 1);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        renderCart();
    }

}

const host = "https://provinces.open-api.vn/api/";
var callAPI = (api) => {
    return axios.get(api)
        .then((response) => {
            renderData(response.data, "city");
        });
}
callAPI('https://provinces.open-api.vn/api/?depth=1');
var callApiDistrict = (api) => {
    return axios.get(api)
        .then((response) => {
            renderData(response.data.districts, "district");
        });
}
var callApiWard = (api) => {
    return axios.get(api)
        .then((response) => {
            renderData(response.data.wards, "ward");
        });
}

var renderData = (array, select) => {
    let row = ' <option disable value="">Chọn Địa Chỉ</option>';
    array.forEach(element => {
        row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`
    });
    document.querySelector("#" + select).innerHTML = row
}
$("#city").change(() => {
    callApiDistrict(host + "p/" + $("#city").find(':selected').data('id') + "?depth=2");
});
$("#district").change(() => {
    callApiWard(host + "d/" + $("#district").find(':selected').data('id') + "?depth=2");
});
$("#ward").change(() => {
})
let result;
let text = document.getElementById("Erorr")
let validate = true;
var printResult = () => {
    let a = $("#city option:selected").text();
    let b = $("#district option:selected").text();
    let c = $("#ward option:selected").text();
    if (a == "Chọn Địa Chỉ" || b == "Chọn Địa Chỉ" || c == "Chọn Địa Chỉ") {
        text.innerHTML = "Hãy Chọn Địa Chỉ";
        validate = false;
        return;
    } else {
        text.innerHTML = ""
    }
    if ($("#district").find(':selected').data('id') != "" && $("#city").find(':selected').data('id') != "" &&
        $("#ward").find(':selected').data('id') != "") {
        validate = true;
        result = $("#city option:selected").text() +
            " | " + $("#district option:selected").text() + " | " +
            $("#ward option:selected").text();
    }
}


function checkout() {
    printResult();
    if (!validate) {
        return
    }
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    if (currentUser == null) {
        handleSnackbar("Cần Đăng Nhập Tài Khoản Để Thêm Sản Phẩm");
        window.location.href = "./login.html"
    }

    if (currentUser.cart.length == 0) {
        handleSnackbar("Không có sản phẩm trong giỏ hàng !");
        return
    }
    if (phone.value == "") {
        phoneError.innerHTML = "Không Được Để Trống!";
        return
    } else {
        phoneError.innerHTML = "";
    }
    if (!phone.value.startsWith("09") || phone.value.length != 10) {
        phoneError.innerHTML = "Số Điện Thoại Đầu 09 và phải 10 số"
        return
    } else {
        phoneError.innerHTML = "";
    }


    const newBill = {
        id: Math.floor(Math.random() * 99999999),
        userId: currentUser.id,
        cart: currentUser.cart,
        address: result,
        phone: document.getElementById("phone").value,
        status: 0,
        totalPrice,
        username: currentUser.username,
    }
    const bills = JSON.parse(localStorage.getItem("bills")) || [];
    bills.unshift(newBill)
    localStorage.setItem("bills", JSON.stringify(bills));
    currentUser.cart = [];
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    handleSnackbar("Thanh Toán Thành Công");
    setTimeout(() => {
        window.location.href = "../html/Information_line.html"
    }, 2000)

}



function handleSnackbar(text) {
    const snackbar = document.createElement("div");
    snackbar.classList.add("snackbar");
    snackbar.innerText = text;
    document.body.appendChild(snackbar);
    setTimeout(() => {
        snackbar.remove();
    }, 6000);
}