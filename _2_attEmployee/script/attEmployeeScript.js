const url = "http://localhost:8080/api/v1";

const lockScrollg = document.querySelector('.lockScroll');
const nameEmployer = document.querySelector('.nameEmployer');

const form = document.querySelector('#form');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const inputPhone = document.querySelector('#phone');
const inputBornDay = document.querySelector('#bornDay');
const inputHireDate = document.querySelector('#hireDate');
const inputPassword = document.querySelector('#password');

const containerGender = document.querySelector('#containergender');
const iconrGender = document.querySelector('#containergender i');
const chooseGender = document.querySelector('.chooseGender');
const titleGender = document.querySelector('.titleGender');
const male = document.querySelector('.male');
const female = document.querySelector('.female');
let gender;

const containerIsActive = document.querySelector('#containerIsActive');
const iconrIsActive = document.querySelector('#containerIsActive i');
const chooseIsActive = document.querySelector('.chooseIsActive');
const titleIsActive = document.querySelector('.titleIsActive');
const Active = document.querySelector('.Active');
const Disabled = document.querySelector('.Disabled');
let active;
const sucessUpdate = document.querySelector('.sucessUpdate');

const deleteEmployee = document.querySelector('#delete');
const confirmDelete = document.querySelector('.confirmDelete');
const deleteCompleted = document.querySelector('.deleteCompleted');

const confirmDeleteBtn = document.querySelector('.confirmDeleteBtn');
const cancelDeleteBtn = document.querySelector('.cancelDeleteBtn');

let cpfEmployee = localStorage.getItem("cpf");
let cnpjManager = localStorage.getItem("cnpj");

async function getDataEmployeeName(){
    const result = await fetch(`${url}/employee/find-by-id/${cpfEmployee}`
    );
    const data = await result.json();

    nameEmployer.innerHTML = data.ename;
}

getDataEmployeeName();

const keyPressInputPhone = () => {
    let inputLength = inputPhone.value.length;

    if(inputLength === 0){
        inputPhone.value += '(';
    } else if(inputLength === 3){
        inputPhone.value += ')';
    } else if(inputLength === 9){
        inputPhone.value += '-';
    }
}

const hiddenContainerGender = () =>{
    chooseGender.classList.toggle('hidden');
    iconrGender.classList.toggle('active');
}

const hiddenContainerIsActive = () => {
    chooseIsActive.classList.toggle('hidden');
    iconrIsActive.classList.toggle('active');
}

inputPhone.addEventListener('keypress', () => {
    keyPressInputPhone();
});

containerGender.addEventListener('click', () => {
    hiddenContainerGender();
    chooseIsActive.classList.add('hidden');
    if(iconrIsActive.classList.contains('active')){
        iconrIsActive.classList.toggle('active');
    }
});

male.addEventListener('click', () =>{
    gender = 0;
    chooseGender.classList.toggle('hidden');
    iconrGender.classList.toggle('active');
    titleGender.innerHTML = 'Male';
});

female.addEventListener('click', () =>{
    gender = 1;
    chooseGender.classList.toggle('hidden');
    titleGender.innerHTML = 'Female';
    iconrGender.classList.toggle('active');
});

containerIsActive.addEventListener("click", () => {
    hiddenContainerIsActive();
});

Active.addEventListener('click', () => {
    active = 1;
    chooseIsActive.classList.toggle('hidden');
    titleIsActive.innerHTML = 'Active';
    iconrIsActive.classList.toggle('active');
});

Disabled.addEventListener('click', () => {
    active = 0;
    chooseIsActive.classList.toggle('hidden');
    titleIsActive.innerHTML = 'inactivo';
    iconrIsActive.classList.toggle('active');
});

async function getListEmployee () {
    
    const result = await fetch(`${url}/employee/find-by-id/${cpfEmployee}`);
    console.log(result.status);
    const dados = await result.json();

    inputName.value= dados.ename;
    inputEmail.value = dados.eemail;

    let dataPhone = dados.ephone;
    
    let inpuPhoneRep = dataPhone.replace(/[^0-9]/g,'');
    let newInputPhoneSli = inpuPhoneRep.slice(2, 13);
    inputPhone.value = newInputPhoneSli;
    
    let a = Array.from(inputPhone.value);
    a.splice(0, 0, '(');
    a.splice(3, 0, ')');
    a.splice(9, 0, '-');

    inputPhone.value = a.join('');

    inputBornDay.value = dados.bornDay;
    inputHireDate.value = dados.hireDate;

    const passwrdVerify = document.querySelector(".passwrdVerify");
    
    inputPassword.addEventListener("keyup", ()=> {
        if(inputPassword.value.length > 0){
            passwrdVerify.classList.add("hidden");
        }else  if(inputPassword.value.length == 0){
            passwrdVerify.classList.remove("hidden");
        }
        console.log(inputPassword.value.length);
    })

    if (dados.isActive == 1) {
        titleIsActive.innerHTML = 'Active';
        gender = 1;

    } else {
        titleIsActive.innerHTML = 'inactivo';
        gender = 0;
        
    }

    if (dados.gender == 1) {
        titleGender.innerHTML = 'Female';
        active = 1;

    } else {
        titleGender.innerHTML = 'Male';
        active = 0;
        
    }
}

getListEmployee();

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let inputNameValueBack = inputName.value;
    console.log(inputNameValueBack);
    
    let inputEmailValueBack = inputEmail.value;
    console.log(inputEmailValueBack);
    
    let inputPhoneValue =  inputPhone.value;
    let inputPhoneValueBack =inputPhoneValue.replace(/[^0-9]/g,'');
    console.log(inputPhoneValueBack)

    let inputBornDayValueBack = inputBornDay.value;
    console.log(inputBornDayValueBack);

    let inputHireDateValueBack = inputHireDate.value;
    console.log(inputHireDateValueBack);

    let inputPasswordValueBack = inputPassword.value;
    console.log(inputPasswordValueBack);

    console.log(gender);
    if(gender == undefined){
        alert('insert gender')
    }

    const init = {
        "ename":inputNameValueBack,
        "eemail":inputEmailValueBack,
        "ephone":inputPhoneValueBack,
        "isActive":0,
        "gender":gender,
        "bornDay":inputBornDayValueBack,
        "hireDate":inputHireDateValueBack,
        "password":inputPasswordValueBack,
        "isActive": active
        }

    async function getDataEmployeeCreation(){
        const result = await fetch(`${url}/employee/update-from/${cnpjManager}/where-id/${cpfEmployee}`,{
            method: "PUT",
            body: JSON.stringify(init),
            headers:{
                "Content-Type" : "application/json; charset=UTF-8"
            }
        });
        const data = await result.json();
        console.log(data);

        sucessUpdate.classList.remove("hideSucess");
        lockScrollg.classList.remove('hide_confirm');

    }
    getDataEmployeeCreation();
});

deleteEmployee.addEventListener('click', () => {

    confirmDelete.classList.remove("hideSucess");
    lockScrollg.classList.remove('hide_confirm');

    confirmDeleteBtn.addEventListener('click', () => {
        deleteCompleted.classList.remove('hideSucess');

        async function deleteEmployee(){
            const result = await fetch(`${url}/employee/delete/${cpfEmployee}/from/${cnpjManager}`, {
                method: "DELETE"
            });
            console.log(result.status); 
        }
        deleteEmployee();
    });

    cancelDeleteBtn.addEventListener('click', () => {
        confirmDelete.classList.add("hideSucess");
        lockScrollg.classList.add('hide_confirm');
    });
});