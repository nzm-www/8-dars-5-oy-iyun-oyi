const form = document.getElementById("form");
const button = document.querySelector("#button");
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const email = document.getElementById("email");
const job = document.getElementById("job");
const select = document.querySelector("#select");
const age = document.querySelector("#age");
const wrapper = document.getElementById("wrapper");

function validate() {
  if (name.value.length < 3) {
    alert("kam soz");
    name.focus();
    name.style.outlinerColor = "red";
    return false;
  }

  if (surname.value.length < 3) {
    alert("kam soz");
    surname.focus();
    surname.style.outlinerColor = "red";
    return false;
  }

  if (!age.value || age.value > 150 || age.value < 0) {
    alert("son kirting");
    surname.focus();
    surname.style.outlinerColor = "red";
    return false;
  }

  if (!img.value.startsWith("https://")) {
    alert("kam soz");
    name.focus();
    name.style.outlinerColor = "red";
    return false;
  }

  return true;
}

function getUsers() {
  let users = [];
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }

  return users;
}

button.addEventListener("click", function (event) {
  event.preventDefault();

  const isValed = validate();
  if (!isValed) {
    return;
  }

  let users = getUsers();

  let user = {
    name: name.value,
    surname: surname.value,
    age: age.value,
    img: img.value,
    email: email.value,
    job: job.value,
    select: select.value,
    id: Date.now(),
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  form.reset();
  let card = creatCard(user);
  wrapper.innerHTML += card;
});

function creatCard(user) {
  return `
    <div id="card" class="card">
        <img width="200" height="200" src="${user.img}"
            alt=""
                    />
            <h3>${user.name + " " + user.surname}</h3>
            <p>${user.age}</p>
            <p>${user.email}</p>
            <p>${user.select}</p>

        <button data-id = "${user.id}" class="edit">Edit</button>
        <button data-id = "${user.id}" class="del" id="delet">Del</button>
        </div>
  `;
}
document.addEventListener("DOMContentLoaded", function () {
  let users = getUsers();
  users.length > 0 && users.forEach((element) => {
      let card = creatCard(element);
      wrapper.innerHTML += card;
    });

  const delet = document.querySelectorAll("#delet");

    delet.length > 0 && delet.forEach(function (element) {
      element.addEventListener('click', function(event){
        event.preventDefault()
        let id = this.getAttribute('data-id');
        
        let isdelet = confirm('uchrasizmi')
        if(isdelet && id){
             let copyUsers = JSON.parse(JSON.stringify(users));
             copyUsers = copyUsers.filter(function(el){
            return el.id != id;
          })
          localStorage.setItem('users',JSON.stringify('copyUsers'))
          window.location.reload();
        }

      })
      
    })

});
