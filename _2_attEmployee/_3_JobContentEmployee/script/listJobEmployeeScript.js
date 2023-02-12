const url = "http://localhost:8080/api/v1";

const insertTable = document.querySelector('#table');
const nameEmployee = document.querySelector('.nameEmployee');

let cpfEmployee = localStorage.getItem("cpf");


async function getDataEmployeeName(){
    const result = await fetch(`${url}/employee/find-by-id/${cpfEmployee}`
    );
    const data = await result.json();

    nameEmployee.innerHTML = data.ename;
}

getDataEmployeeName();

async function getEmployee() {
    const result = await fetch(`${url}/employee/find-by-id/${cpfEmployee}`);
    const data = await result.json();
    const jobs = data.jobs;
    
    jobs.map((dataJob, index) => {
        //console.log(index);
        
        //console.log(dataJob);

        const tr = document.createElement('tr');
        tr.classList.add('confiTable');

        const td1 = document.createElement('td');
        td1.setAttribute('id', 'name');
        const td2 = document.createElement('td');
        td2.setAttribute('id', 'description');
        const td3 = document.createElement('td');
        td3.setAttribute('id', 'creationDay');
        const td4 = document.createElement('td');
        td4.setAttribute('id', 'FinishDay');
        const td5 = document.createElement('td');
        td5.setAttribute('id', 'status');
        const td6 = document.createElement('td');
        td6.setAttribute('id', 'edit');
        
        const link = document.createElement('a');
        link.setAttribute('href', '../_4_updateJob/updateJob.html');

        const iconEdit = document.createElement('i');
        iconEdit.classList.add('uil', 'uil-file-edit-alt');

        link.appendChild(iconEdit);
        td6.appendChild(link);

        td1.innerText = dataJob.name;
        td2.innerText = dataJob.description;
        td3.innerText = dataJob.creationDay;
        td4.innerText = dataJob.finishDay;

        const icon = document.createElement('i');
        icon.classList.add('uil', 'uil-circle');
        
        if(dataJob.isFinished === true){
            icon.classList.add('color2')
        } else {
            icon.classList.add('color1')
        } 

        td5.appendChild(icon);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        insertTable.appendChild(tr);

        let idJob = dataJob.id;
        
        link.addEventListener('click', (e) => {
            //e.preventDefault();
            localStorage.setItem("idjob", idJob);
            console.log(jobs);
            localStorage.setItem("index", index);
            console.log(jobs);


            console.log(index);
        })
    })
}

getEmployee();