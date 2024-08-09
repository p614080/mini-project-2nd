let xhttp = new XMLHttpRequest();
xhttp.open("GET", "./json/business_member.json", true);
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let storage = JSON.parse(this.response);
    for (let i = 0; i < storage.length; i++) {
      let tr = document.createElement("tr");

      let tdName = document.createElement("td");
      let a = document.createElement("a");
      a.href = storage[i].url;
      a.innerHTML = storage[i].name;
      a.onclick = function () {
        localStorage.setItem("selectedUser", JSON.stringify(storage[i]));
      };
      tdName.appendChild(a);
      tr.appendChild(tdName);

      let tdId = document.createElement("td");
      tdId.innerHTML = storage[i].id;
      tr.appendChild(tdId);

      let tdEmail = document.createElement("td");
      tdEmail.innerHTML = storage[i].email;
      tr.appendChild(tdEmail);

      let tdPhone = document.createElement("td");
      tdPhone.innerHTML = storage[i].phonnumber;
      tr.appendChild(tdPhone);

      let tdSignupDate = document.createElement("td");
      tdSignupDate.innerHTML = storage[i].signupdate;
      tr.appendChild(tdSignupDate);

      let tdApprove = document.createElement("td");
      tdApprove.innerHTML = storage[i].approve;
      tr.appendChild(tdApprove);

      document.querySelector("tbody").appendChild(tr);
    }
  }
};
xhttp.send();
