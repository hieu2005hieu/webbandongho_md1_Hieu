let currentUser = JSON.parse(localStorage.getItem("currentUser"))
if (!currentUser) {
  window.location.href = "../index.html"
}
if (currentUser.role != 1) {
  window.location.href = "../index.html"
}


function render() {
  let data = JSON.parse(localStorage.getItem("bills"));
  let total = ``;
  let thongTinHTML = ""

  for (let i = 0; i < data.length; i++) {
    thongTinHTML = ""
    let cart = data[i].cart

    for (let j = 0; j < cart.length; j++) {
      thongTinHTML +=
        `
          <div class="order_product">
            <img width="100px" src="${cart[j].img}" />
            <br/>
            <p>${cart[j].ten}</p>
            <p>GIÁ: ${Number(cart[j].gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <p>SỐ LƯỢNG: ${cart[j].quantity}</p>
          </div>
        `
    }

    total += `
        <tr class="tr1">
          <td class="td1">${data[i].username}</td>
          <td class="td1">${data[i].address}</td>
          <td class="td1">${data[i].phone}</td>
          <td class="td1">${thongTinHTML}</td>
          <td class="td1">${Number(data[i].totalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
          <td class="td1">${data[i].status == 0 ? `<span style="color: green">Đang Chờ</span>` : data[i].status == 1 ? `<span style="color:blue ">Chấp nhận</span>` : `<span style="color: red">Từ chối</span>`}</td>
          <td class="td1">
            ${data[i].status == 0 ?
        ` <button onclick="changStatus('${i}',1)">Chấp nhận</button>
          <button onclick="changStatus('${i}',2)">Hủy</button>`
        : ""}
          </td>
        </tr>
    `;
  }
  document.getElementById("tableAdded").innerHTML = total;
}
render()

function changStatus(index, status) {
  let accept = confirm("bạn có muốn tiếp tục ?")
  if (accept) {
    const bills = JSON.parse(localStorage.getItem("bills")) || []
    bills[index].status = status
    localStorage.setItem("bills", JSON.stringify(bills))
    render()
  }
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