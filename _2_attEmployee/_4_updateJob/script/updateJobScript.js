const url = "http://localhost:8080/api/v1";

const body = document.querySelector('body');

const lockScrollg = document.querySelector('.lockScroll');

const finished = document.querySelector('.finished');
const confirmFinish = document.querySelector('.confirmFinish');
const okFinish = document.querySelector('#okFinish');
const noFinish = document.querySelector('#noFinish');
const yesFinish = document.querySelector('#yesFinish');
const finishedHeader = document.querySelector('.finishedHeader');
const wasFinished = document.querySelector('.wasFinished');
const wasBtnFin = document.querySelector('#wasBtnFin');

const deleted = document.querySelector('.deleted');
const confirmDelet = document.querySelector('.confirmDelet');
const noDelete = document.querySelector('#noDelete');
const yesDelete = document.querySelector('#yesDelete');

const activateJob = document.querySelector('.activateJob');
const noActivate = document.querySelector('#noActivate');
const yesActivate = document.querySelector('#yesActivate');
const wasActivate = document.querySelector('.wasActivate');
const wasBtnAct = document.querySelector('#wasBtnAct');

const back = document.querySelector('.back');

const updateSucess = document.querySelector('.updateSucess');

const nameJob = document.querySelector('#name');
const description = document.querySelector('#description');
const finishDay = document.querySelector('#finishDay');
const send = document.querySelector('#send');

let cpfEmployee = localStorage.getItem("cpf");
let cnpjManager = localStorage.getItem("cnpj");
let idJob = localStorage.getItem("idjob");

let finishJob;

async function getDataJob(){
    const result = await fetch(`${url}/employee/find-by-id/${cpfEmployee}`);
    const data = await result.json();
    const usedData = await data.jobs//[idJob - 1];
    console.log(usedData)
    let index = localStorage.getItem("index");

    nameJob.value = usedData[index].name;
    description.value = usedData[index].description;
    finishDay.value = usedData[index].finishDay;
    finishJob = usedData[index].isFinished;
    console.log(data.jobs)


    if(finishJob === false){
        finishedHeader.innerText = "Finish Job";
    } else {
        finishedHeader.innerText = "Activate Job";

    }
    
}
getDataJob();

finished.addEventListener('click', () => {
    console.log(finishJob)
    if(finishJob === false){

        lockScrollg.classList.remove('hide_confirm');
        confirmFinish.classList.remove("hidde");
        
        noFinish.addEventListener('click', () => {
            lockScrollg.classList.add('hide_confirm');
            confirmFinish.classList.add("hidde");
    
        });
    
        yesFinish.addEventListener('click', () => {
            confirmFinish.classList.add("hidde");
            wasFinished.classList.remove("hidde");

            wasBtnFin.addEventListener('click', () => {
                finishJob = true;
                wasFinished.classList.add("hidde");
                lockScrollg.classList.add('hide_confirm');
                finishedHeader.innerText = "Activate Job";
                console.log(finishJob)

            });
        });

    } else {

        lockScrollg.classList.remove('hide_confirm');
        activateJob.classList.remove("hidde");

        noActivate.addEventListener('click', () => {
            lockScrollg.classList.add('hide_confirm');
            activateJob.classList.add("hidde");
        });

        yesActivate.addEventListener('click', () => {
            wasActivate.classList.remove("hidde");
            activateJob.classList.add("hidde");

            wasBtnAct.addEventListener('click', () => {
                finishJob = false;
                wasActivate.classList.add("hidde");
                lockScrollg.classList.add('hide_confirm');
                finishedHeader.innerText = "Finish Job";
                console.log(finishJob)

            });
        });
    }
});

deleted.addEventListener('click', () => {
    lockScrollg.classList.remove('hide_confirm');
    confirmDelet.classList.remove('hidde');

    noDelete.addEventListener('click', () => {
        lockScrollg.classList.add('hide_confirm');
        confirmDelet.classList.add('hidde');
    });

    yesDelete.addEventListener('click', () => {
        confirmDelet.classList.add('hidde');
        back.classList.remove('hidde');

        async function deleteJob() {
            const result = await fetch(`${url}/job/delete/${idJob}`, {
                method: "DELETE"
            });
            console.log(result.status);  
        }
        deleteJob();
    });
});

send.addEventListener('click', (e) => {
    
    e.preventDefault();

    const init =  {
        "name": nameJob.value,
        "description": description.value,
        "finishDay": finishDay.value,
        "isFinished":finishJob
    }

    async function putDataJob(){
        const result = await fetch(`${url}/job/update/${idJob}/where-employer/${cpfEmployee}/from-manager/${cnpjManager}`,{
            method: 'PUT',
            body: JSON.stringify(init),
            headers:{
                "Content-Type" : "application/json; charset=UTF-8"
            }
        }
        
        );
        const data = await result.json();

        console.log(data);
    }
    putDataJob()

    console.log(nameJob.value);
    console.log(description.value);
    console.log(finishDay.value);
    console.log(finishJob);


    lockScrollg.classList.remove('hide_confirm');
    updateSucess.classList.remove('hidde');
});
