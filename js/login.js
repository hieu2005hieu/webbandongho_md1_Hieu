let giayRotate;
let phutRotate;
let gioRotate;

setInterval(getTimea, 1000)
getTimea()
// runtime()
function getTimea() {
    let date = new Date()
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    if (sec == 0) {
        sec = 60
    }
    if (sec >= 45) {
        giayRotate = (sec - 45) * 6
    } else {
        giayRotate = 90 + (sec * 6)
    }

    if (min == 0) {
        min = 60
    }
    if (min >= 45) {
        phutRotate = (min - 45) * 6
    } else {
        phutRotate = 90 + (min * 6)
    }

    if (hour == 0) {
        hour = 24
    }
    if (hour >= 9) {
        gioRotate = (hour - 9) * 30 + (min / 60) * 30
    } else {
        gioRotate = 90 + (hour * 30) + (min / 60) * 30
    }
    document.getElementById("kimgiay").style.transform = `rotateZ(${giayRotate}deg)`
    document.getElementById("kimphut").style.transform = `rotateZ(${phutRotate}deg)`
    document.getElementById("kimgio").style.transform = `rotateZ(${gioRotate}deg)`
}
const regexEmail = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/

function login(event) {
    event.preventDefault();
    let passWordError = document.getElementById("password-error");
    let emailError = document.getElementById("email-error");
    let passWord = document.getElementById("passWord");
    let email = document.getElementById("email");
    let waitingError = document.getElementById("waiting-error");
    let users = JSON.parse(localStorage.getItem("users")) || [];


    if (email.value == "") {
        emailError.innerHTML = "Email không được để trống!"
        waitingError.innerHTML = "";
        return
    } else {
        emailError.innerHTML = "";
    }
    if (!regexEmail.test(email.value)) {
        emailError.innerHTML = "Không đúng định dạng Email"
        return
    } else {
        emailError.innerHTML = "";
    }
    if (passWord.value == "") {
        passWordError.innerHTML = "Mật Khẩu Không Được Để Trống!";
        waitingError.innerHTML = "";
        return
    } else {
        passWordError.innerHTML = "";
    }

    
    let check = false;
    for (let i = 0; i < users.length; i++) {
        if (passWord.value == users[i].password && email.value == users[i].email) {
            check = true
            waitingError.innerHTML = "";
            if (users[i].role === 1) {
                localStorage.setItem("currentUser", JSON.stringify(users[i]));
                window.location.href = "../html/admin/product_Management.html"
                return;
            }
            if (!users[i].status) {
                handleSnackbar("Tài Khoản Của Bạn Đã Bị Ban");
                return;
            }
            localStorage.setItem("currentUser", JSON.stringify(users[i]));
            handleSnackbar("Đăng Nhập Thành Công");
            setTimeout(() => {
                window.location.href = "./index.html"
            }, 3000)
            return;
        }
    }
    if (!check) {
        waitingError.innerHTML = "Chưa có tài khoản hoặc sai mật khẩu !"
    }
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
