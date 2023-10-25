// const category = [
//   {id: 1, name: "Đồng hồ nam"},
//   {id: 2, name: "Đồng hồ nữ"}
// ]
// localStorage.setItem("category", JSON.stringify(category))



//Lấy mảng Product trên local
let listProduct = JSON.parse(localStorage.getItem("listProduct"));
let category = JSON.parse(localStorage.getItem("category"));
let currentUser = JSON.parse(localStorage.getItem("currentUser"))
if (!currentUser) {
  window.location.href = "../index.html"
}
if (currentUser.role != 1) {
  window.location.href = "../index.html"
}


// Lấy thẻ select từ DOM
let categorySelect = document.getElementById("categorySelect");



// Lặp qua danh sách category và thêm từng loại là một option
category.forEach((categoryItem) => {
  let option = document.createElement("option");
  option.value = categoryItem.name;
  option.text = categoryItem.name;
  categorySelect.appendChild(option);
});

function logout() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || []
  const index = users.findIndex(user => user.id == currentUser.id)
  // finindex tra ra vi tri của phàn tử trong mảng theo từng phần tử.id = id của curuser
  users[index] = currentUser
  // lưu cart
  localStorage.setItem("users", JSON.stringify(users))
  localStorage.removeItem("currentUser")
  window.location.href = "../login.html"
}

//them anh
let dataIamge = ""
function changeAvatar() {
  // lay thong tin anh trong o input
  let file = document.getElementById("imgProduct").files[0]

  // khai bao mot doi tuong de ma hoa anh
  let reader = new FileReader();
  reader.onloadend = function () {
    // ket qua
    dataIamge = reader.result
    // gan ket qua cho anh tren man hinh
    document.getElementById("image").src = dataIamge
    // cap nhat thong tin user dang login
  }
  reader.readAsDataURL(file);
}



// Render list product
function renderProduct() {
  const listProduct = JSON.parse(localStorage.getItem("listProduct"))
  let total = `
      <tr class="tr1">
        <td class="td1">ID</td>
        <td class="td1">Ảnh</td>  
        <td class="td1">Tên</td>
        <td class="td1">Loại</td>
        <td class="td1">Giá</td>
        <td class="td1">Số lượng</td>
        <td class="td1" colspan="2">Tính năng</td>
      </tr>
  `;
  for (let i = 0; i < listProduct.length; i++) {
    total += `
      <tr class="tr1">
        <td class="td1">${listProduct[i].ID}</td>
        <td class="td1"><img src="${listProduct[i].img}" alt="ảnh" width="60px" height="70px" /></td>
        <td class="td1">${listProduct[i].ten}</td>
        <td class="td1">${listProduct[i].category}</td>
        <td class="td1">${Number(listProduct[i].gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
        <td class="td1 a">${listProduct[i].soluong}</td>
        <td class="td1"><button class="buttonNe" onclick="editButton('${listProduct[i].ID}')">Edit</button></td>
        <td class="td1"><button class="buttonNe" onclick="deleteButton(${i})">Delete</button>
          </td>
      </tr>
  `;
  }
  document.getElementById("tableAdded").innerHTML = total;
}


// Sinh ID
function makeCode() {
  return Math.floor(Math.random() * 9999999) + new Date().getMilliseconds();
}
// Thêm sản phẩm
function saveButton() {
  let nameProductInput = document.getElementById("nameProduct").value.trim();
  let priceProductInput = document.getElementById("priceProduct").value;
  let numberProduct = document.getElementById("sl").value;
  let category = document.getElementById("categorySelect").value;

  let product = {
    ID: makeCode(),
    img: dataIamge,
    ten: nameProductInput,
    gia: priceProductInput,
    soluong: numberProduct,
    category: category,
  };

  if (listProduct == null) {
    listProduct = [];
    listProduct.unshift(product);
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
  } else {
    listProduct.unshift(product);
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
  }
  document.getElementById("nameProduct").value = "";
  document.getElementById("priceProduct").value = "";
  document.getElementById("sl").value = "";
  dataIamge = ""
  document.getElementById("image").src = ""
  localStorage.removeItem("myImage");
  renderProduct();
}
renderProduct();


// Xóa sản phẩm
function deleteButton(id) {
  listProduct.splice(id, 1);
  localStorage.setItem("listProduct", JSON.stringify(listProduct));
  renderProduct();
}


let idProductEdit
// Bắn thông tin sản phẩm cần sửa
function editButton(id) {
  window.scrollTo(0, 0)
  const products = JSON.parse(localStorage.getItem("listProduct"));
  const infoProductEdit = products.find(item => item.ID == id);//trả về phần tử đầu tiên mảng
  document.getElementById("nameProduct").value = infoProductEdit.ten;
  document.getElementById("priceProduct").value = infoProductEdit.gia;
  document.getElementById("sl").value = infoProductEdit.soluong;
  document.getElementById("categorySelect").value = infoProductEdit.category
  dataIamge = infoProductEdit.img
  document.getElementById("image").src = dataIamge
  idProductEdit = infoProductEdit.ID
}
// Chỉnh sửa thông tin của sản phẩm
// let ab
function editAll() {
  const products = JSON.parse(localStorage.getItem("listProduct"))
  let nameProductInput = document.getElementById("nameProduct").value;
  let priceProductInput = document.getElementById("priceProduct").value;
  let numberProduct = document.getElementById("sl").value;
  let category = document.getElementById("categorySelect").value;
  let product = {
    ID: idProductEdit,
    img: dataIamge,
    ten: nameProductInput,
    gia: priceProductInput,
    soluong: numberProduct,
    category: category,
  };

  const index = products.findIndex(item => item.ID == idProductEdit)//trả về chỉ số phần tử đầu tiên neu k về -1 
  // ab = index
  products[index] = product
  localStorage.setItem("listProduct", JSON.stringify(products))
  document.getElementById("nameProduct").value = "";
  document.getElementById("priceProduct").value = "";
  document.getElementById("sl").value = "";
  dataIamge = ""
  document.getElementById("image").src = ""
  renderProduct()
  // document.getElementsByClassName("a")[index].classList.add("b")
  // setTimeout(removeColor, 3000)
}
// function removeColor() {
//   document.getElementsByClassName("a")[ab].classList.remove("b")
// }







