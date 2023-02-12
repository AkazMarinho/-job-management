const url = "http://localhost:8080/api/v1";

const nameJob = document.querySelector('#name');
const description = document.querySelector('#description');
const finishDay = document.querySelector('#finishDay');

const lockScrollg = document.querySelector('.lockScroll');
const confirmCreateJob = document.querySelector('.confirmCreateJob');

const send = document.querySelector('#send');

let cpfEmployee = localStorage.getItem("cpf");
let cnpjManager = localStorage.getItem("cnpj");



send.addEventListener('click', (e) => {
    e.preventDefault();
    
    const init = {
        "cnpj":cnpjManager,
        "cpf":cpfEmployee,
        "jobs":[{
            "name":nameJob.value,
            "description": description.value,
            "finishDay":finishDay.value
        }]
    }
    async function creatJob() {
        const result = await fetch(`${url}/job/create`, {
            method: "PUT",
            body: JSON.stringify(init),
            headers:{
                "Content-Type" : "application/json; charset=UTF-8"
            }
        });
        
        console.log(result.status);
    }
    creatJob();

    lockScrollg.classList.remove('hide_confirm');
    confirmCreateJob.classList.remove('hidde');

});
