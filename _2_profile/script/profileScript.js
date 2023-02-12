const url = "http://localhost:8080/api/v1";

const lockScrollg = document.querySelector('.lockScroll');
let cnpjManager = localStorage.getItem("cnpj");

const nameManager = document.querySelector('#name');
const Cnpj = document.querySelector('#Cnpj');
const company = document.querySelector('#company');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');


async function getDataManager() {
    const result = await fetch(`${url}/manager/find-by-cnpj/${cnpjManager}`);
    const data = await result.json();

    console.log(data);

    nameManager.innerText = data.mname;
    Cnpj.innerText = data.cnpj;
    company.innerText = data.mcompany;
    phone.innerText = data.mphone;
    email.innerText = data.memail;

}

getDataManager();