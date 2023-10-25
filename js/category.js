let category = JSON.parse(localStorage.getItem("category"));
function render(data = category) {
  let total = `
        <tr class="tr1">
          <td class="td1">id</td>  
          <td class="td1">Tên</td>
          <td class="td1" colspan="2">Tính năng</td>
        </tr>
    `;
  for (let i = 0; i < data.length; i++) {
    total += `
        <tr class="tr1">
          <td class="td1">${data[i].id}</td>
          <td class="td1">${data[i].name}</td>
          <td class="td1"> 
          <button onclick="editcategory(${data[i].id})">edit</button>
          <button onclick="deleteButton(${i})">xoa</button>
        </td>
        </tr>
    `;
  }
  document.getElementById("tableAdded").innerHTML = total;
}
render();

function deleteButton(id) {
  category.splice(id, 1);
  localStorage.setItem("category", JSON.stringify(category));
  render();
}

function saveButton() {
  let nameCategory = document.getElementById("categoryUsername").value;
  let newCategory = {
    id: category[category.length - 1].id + 1,
    name: nameCategory,
  };

  if (category == null) {
    category = [];
    category.push(newCategory);
    localStorage.setItem("category", JSON.stringify(category));
  } else {
    category.push(newCategory);
    localStorage.setItem("category", JSON.stringify(category));
  }
  document.getElementById("categoryUsername").value = "";
  render();
}
render();
function editcategory(id) {
  let category = JSON.parse(localStorage.getItem("category")) || [];
  let find_category = category.find((category) => category.id === id);
  document.getElementById("categoryUsername").value = find_category.name;
  localStorage.setItem("idProduct", id)
}
function editAll() {
  let id = localStorage.getItem("idProduct");
  let categoryUsername = document.getElementById("categoryUsername").value;
  let index = category.findIndex(item => item.id == id)
  category[index].name = categoryUsername
  localStorage.setItem("category", JSON.stringify(category));
  document.getElementById("categoryUsername").value = "";
  localStorage.removeItem("idProduct")
  render();
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
  window.location.href = "../login.html"
}
let currentUser = JSON.parse(localStorage.getItem("currentUser"))
if (!currentUser) {
  window.location.href = "../index.html"
}
if (currentUser.role != 1) {
  window.location.href = "../index.html"
}
