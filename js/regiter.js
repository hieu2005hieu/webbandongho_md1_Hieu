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


let arrUser = JSON.parse(localStorage.getItem("users")) || [];

function register(event) {
    event.preventDefault();
    let userName = document.getElementById("userName");
    let paasWord = document.getElementById("passWord");
    let confirmspasswords = document.getElementById("confirms-passwords")
    let email = document.getElementById("email");
    let fullnameError = document.getElementById("fullname-error");
    let passwordError = document.getElementById("password-error");
    let emailError = document.getElementById("email-error");
    let confirmPasswordError = document.getElementById("confirm-password-error");

    let users = {
        role: 0,
        id: id(),
        cart: [],
        username: userName.value,
        password: paasWord.value,
        email: email.value,
        status: true,
    }
    function id() {
        return Math.floor(Math.random() * 9999999999) + new Date().getMilliseconds();
    }
    const regexName = /^\w{5,}$/
    const regexEmail = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
    const regexPassword = /^(?=.*[A-Z])(?=.*\d).{6,}$/


    if (!regexName.test(userName.value)) {
        fullnameError.innerHTML = "Tên phải có trên 5 kí tự!"
        return
    } else {
        fullnameError.innerHTML = "";
    }
    if (!regexPassword.test(paasWord.value)) {
        passwordError.innerHTML = "Password phải có ít nhất 6 kí tự </br> 1 chữ hoa và 1 số"
        return
    } else {
        passwordError.innerHTML = "";
    }
    if (!regexEmail.test(email.value)) {
        emailError.innerHTML = "Không đúng định dạng Email"
        return
    } else {
        emailError.innerHTML = "";
    }
    if (paasWord.value != confirmspasswords.value) {
        confirmPasswordError.innerHTML = "Nhập Lại đúng mật khẩu"
        return
    } else {
        confirmPasswordError.innerHTML = "";
    }
    let listUser = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < listUser.length; i++) {
        if (listUser[i].email == email.value) {
            emailError.innerHTML = "Email Đã Được Đăng Kí"
            return
        } else {
            emailError.innerHTML = ""
        }

    }


    let check = true;
    for (let i = 0; i < arrUser.length; i++) {
        if (arrUser[i].username == userName.value) {
            handleSnackbar("Tên Tài Khoản Đã Tồn Tại");
            check = false;
            break;
        }
    }
    if (check) {
        arrUser.push(users);
        handleSnackbar("Đăng Kí Thành Công");
        localStorage.setItem("users", JSON.stringify(arrUser));
        setTimeout(() => {
            window.location.href = "./login.html"
        }, 3000)

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