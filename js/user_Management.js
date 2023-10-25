let users= JSON.parse(localStorage.getItem("users"));
let currentUser = JSON.parse(localStorage.getItem("currentUser"))
if (!currentUser) {
  window.location.href = "../index.html"
}
if (currentUser.role != 1) {
  window.location.href = "../index.html"
}

function render(data = users) {
    
    let total = `
        <tr class="tr1">
          <td class="td1">ID</td>  
          <td class="td1">Tên</td>
          <td class="td1">email</td>
          <td class="td1">status</td>
          <td class="td1">Tính năng</td>
        </tr>
    `;
    for (let i = 0; i < data.length; i++) {
      total += `
        <tr class="tr1">
          <td class="td1">${data[i].id}</td>
          <td class="td1">${data[i].username}</td>
          <td class="td1">${data[i].email}</td>
          <td class="td1">${data[i].status ? "Active" : "Ban"}</td>
          <td class="td1">
            <button class="buttonNe" onclick="changeStatus('${data[i].id}')">
            ${data[i].status ? "Ban" : "Active"}
            </button>
          </td>
          
        </tr>
    `;
    }
    document.getElementById("tableAdded").innerHTML = total;
}
render()

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
function changeStatus(id) {
  //lấy danh sách người dùng về
  const users = JSON.parse(localStorage.getItem("users")) || []
  // tìm vị trí người cần ban
  const index = users.findIndex(user => user.id == id)
  // sửa trạng thái tại 
  users[index].status = !users[index].status
  // lưu lại lên local
  localStorage.setItem("users", JSON.stringify(users))
  // vẽ lại giao diện
  render(users)
}