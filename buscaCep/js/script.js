const getCep = async () => {
  let val = document.getElementById("cep").value;
  await fetch(`https://viacep.com.br/ws/${val}/json/`)
    .then((T) => T.json())
    .then((data) => {
      createTable(data);
      saveLocalStorage(data);
    });
};

const saveLocalStorage = (data) => {
  let local = localStorage.getItem("table");
  if (local) {
    let convert = JSON.parse(local);
    convert.push(data);
    localStorage.setItem("table", JSON.stringify(convert));
  } else {
    localStorage.setItem("table", JSON.stringify([data]));
  }
};

const cleanTable = () => {
  const myNode = document.getElementById("enderecos-tbody");
  myNode.innerHTML = "";
  localStorage.removeItem("table");
};

const restauredTable = () => {
  let local = localStorage.getItem("table");
  if (local) {
    let convert = JSON.parse(local);

    convert.forEach((val) => createTable(val));
  }
};

const createTable = (data) => {
  let th = document.createElement("tr");

  let td1 = document.createElement("td");
  td1.innerText = data.cep;

  let td2 = document.createElement("td");
  td2.innerText = data.logradouro;

  let td3 = document.createElement("td");
  td3.innerText = data.logradouro;

  let td4 = document.createElement("td");
  td4.innerText = `${data.localidade} / ${data.uf}`;

  th.appendChild(td1);
  th.appendChild(td2);
  th.appendChild(td3);
  th.appendChild(td4);

  document.getElementById("enderecos-tbody").appendChild(th);
};
