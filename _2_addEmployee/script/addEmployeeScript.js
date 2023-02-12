const url = "http://localhost:8080/api/v1";

const lockScrollg = document.querySelector('.lockScroll');

const form = document.querySelector('#form');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const inputPhone = document.querySelector('#phone');
const inputBornDay = document.querySelector('#bornDay');
const inputCpf = document.querySelector('#cpf');
const inputPassword = document.querySelector('#password');
const containerGender = document.querySelector('#containergender');
const iconrGender = document.querySelector('#containergender i');
const chooseGender = document.querySelector('.chooseGender');
const titleGender = document.querySelector('.titleGender');
const male = document.querySelector('.male');
const female = document.querySelector('.female');
let gender;

const sucessCreation = document.querySelector('.sucessCreation');

let cnpjManager = localStorage.getItem("cnpj");

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

const keyPressInputBornDay = () => {
    let inputLength = inputBornDay.value.length;

    if(inputLength === 2 || inputLength === 5){
        inputBornDay.value += '/';
    } 
}

const keyPressInputCpf = () => {
    let inputLength = inputCpf.value.length;

    if(inputLength === 3 || inputLength === 7){
        inputCpf.value += '.';
    } else if(inputLength === 11){
        inputCpf.value += '-';
    }
}

const hiddenContainerGender = () =>{
    chooseGender.classList.toggle('hidden');
    iconrGender.classList.toggle('active');
}

inputPhone.addEventListener('keypress', () => {
    keyPressInputPhone();
});

inputBornDay.addEventListener('keypress', () => {
    keyPressInputBornDay();
});

inputCpf.addEventListener('keypress', () => {
    keyPressInputCpf();
});

containerGender.addEventListener('click', () => {

    hiddenContainerGender();

});

male.addEventListener('click', () =>{
    gender = 0;
    chooseGender.classList.toggle('hidden');
    iconrGender.classList.toggle('active');
    titleGender.innerHTML = 'Male'
});

female.addEventListener('click', () =>{
    gender = 1;
    chooseGender.classList.toggle('hidden');
    titleGender.innerHTML = 'Female'
    iconrGender.classList.toggle('active');
});



form.addEventListener('submit', (e) => {
    e.preventDefault();

    let inputNameValueBack = inputName.value;
    console.log(inputNameValueBack);
    
    let inputEmailValueBack = inputEmail.value;
    console.log(inputEmailValueBack);
    
    let inputPhoneValue =  inputPhone.value;
    let inputPhoneValueBack ='+55' +  inputPhoneValue.replace(/[^0-9]/g,'');
    console.log(inputPhoneValueBack)

    let inputBornDayValueBack = inputBornDay.value;
    console.log(inputBornDayValueBack);

    let inputCpfValue = inputCpf.value;
    let inputCpfValueBack = inputCpfValue.replace(/[^0-9]/g,'');
    console.log(inputCpfValueBack)

    let inputPasswordValueBack = inputPassword.value;
    console.log(inputPasswordValueBack);

    console.log(gender);
    if(gender == undefined){
        alert('insert gender')
    }

    const init = 
    {	
        "cnpj": cnpjManager,
        "employees":
            [{
                "ename":inputNameValueBack,
                "eemail":inputEmailValueBack,
                "ephone":inputPhoneValueBack,
                "cpf":inputCpfValueBack,
                "gender":gender,
                "bornDay":inputBornDayValueBack,
                "password":inputPasswordValueBack
            }]
    }

    async function getDataEmployeeCreation(){
        const result = await fetch(`${url}/employee/create-employee`,{
            method: "PUT",
            body: JSON.stringify(init),
            headers:{
                "Content-Type" : "application/json; charset=UTF-8"
            }
        });
        const data = await result.json();
        console.log(data);

        sucessCreation.classList.remove("hideSucess");
        lockScrollg.classList.remove('hide_confirm');
    }
    getDataEmployeeCreation();
});