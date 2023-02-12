const url = "http://localhost:8080/api/v1";

const allJobsTable = document.querySelector('.allJobsTable');
const allFinsheddTable = document.querySelector('.allFinsheddTable');

const aJobs = document.querySelector('.aJobs');
const aFin = document.querySelector('.aFin');

async function getAllJobs() {
    const result = await fetch(`${url}/job/get/all`);
    const data = await result.json();

    console.log(data);

    data.map(item => {

        const tr = document.createElement('tr');
        tr.classList.add('confiTable');

        const td1 = document.createElement('td');
        td1.setAttribute('id', 'Jname');
        const td2 = document.createElement('td');
        td2.setAttribute('id', 'Jdescription');
        const td3 = document.createElement('td');
        td3.setAttribute('id', 'JcreationDay');
        const td4 = document.createElement('td');
        td4.setAttribute('id', 'JFinishDay');
        const td5 = document.createElement('td');
        td5.setAttribute('id', 'Jstatus');

        td1.innerHTML = item.name ;
        td2.innerHTML = item.description ;
        td3.innerHTML = item.creationDay ;
        td4.innerHTML = item.finishDay ;
        td5.innerHTML = item.isFinished;

        if(item.isFinished === true){
            td5.innerHTML = 'Finished'
        } else {
            td5.innerHTML = 'Active';
        }

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        allJobsTable.appendChild(tr);
    })
}

getAllJobs();

async function getAllJobsFinshed() {
    const result = await fetch(`${url}/job/get/all-finished`);
    const data = await result.json();

    console.log(data);

    data.map(item => {

        const tr = document.createElement('tr');
        tr.classList.add('confiTable');

        const td1 = document.createElement('td');
        td1.setAttribute('id', 'Jname');
        const td2 = document.createElement('td');
        td2.setAttribute('id', 'Jdescription');
        const td3 = document.createElement('td');
        td3.setAttribute('id', 'JcreationDay');
        const td4 = document.createElement('td');

        td1.innerHTML = item.name ;
        td2.innerHTML = item.description ;
        td3.innerHTML = item.creationDay ;


        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        allFinsheddTable.appendChild(tr);
    })
}

getAllJobsFinshed();

aJobs.addEventListener('click', () => {
    
    allFinsheddTable.classList.add('hidde');
    aJobs.classList.add('captionpStyle');
    allJobsTable.classList.remove('hidde');
    aFin.classList.remove('captionpStyle');
});

aFin.addEventListener('click', () => {

    allJobsTable.classList.add('hidde');
    allFinsheddTable.classList.remove('hidde');
    aJobs.classList.remove('captionpStyle');
    aFin.classList.add('captionpStyle');
});