const url = "http://localhost:8080/api/v1";

const form = document.querySelector('#form');
const cnpjData = document.querySelector('#cnpj');
const password = document.querySelector('#password');
const btn = document.querySelector('#button');
const btnInval = document.querySelector('#button');
const alin = document.querySelector('.alin');
const inval = document.querySelector('.inval');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('cnpj: ' + cnpjData.value + '; passowrd: ' + password.value);

    const init = {
        //15356739012348
        "id":cnpjData.value,
        //33ggww44
	    "password":password.value
    }
    
    async function getDataManager(){
        const result = await fetch(`${url}/manager/login`, {
            method: "POST",
            body: JSON.stringify(init),
            headers:{
                "Content-Type" : "application/json; charset=UTF-8"
            }
        });
        const data = await result.json();
        console.log(data.message);

        let verify;
        if(data.message === 'Usuário logado com sucesso!'){
            verify = 1;
        }else{
            verify = 0;
        }
        console.log(verify);

        if(verify === 1) {
            alin.classList.remove('hide');
            let cnpj = cnpjData.value;
            let key = 'cnpj';

            localStorage.setItem(key, cnpj);

            console.log('key: ' + key + '; value: ' + cnpj);
            let myItem = localStorage.getItem(key, cnpj)
            console.log(myItem)

            btn.addEventListener('submit', (e) => {
                e.preventDefault();
            });

        }else if(verify===0){
            let cnpj = 00;
            let key = 'cnpj';

            localStorage.setItem(key, cnpj);
            inval.classList.remove('hide');
            btnInval.addEventListener('click', (e) => {
                inval.classList.add('hide');
            });
        }
    }
    
    getDataManager();
});

const toggleModeBody = document.querySelector('body')
const darkMode = document.querySelector('.i_1');
const toggleModeHeader = document.querySelector('header');

const veriryDarkMode = () =>{
    
    const darkMode = localStorage.getItem("dark");

    if(darkMode){
        toggleModeBody.classList.toggle('body_dark');
        toggleModeHeader.classList.toggle('dark');

    }
}


veriryDarkMode();

darkMode.addEventListener('click', () => {
    toggleModeBody.classList.toggle('body_dark');
    toggleModeHeader.classList.toggle('dark');

    localStorage.removeItem("dark")
    if(toggleModeHeader.classList.contains("dark")){
        localStorage.setItem("dark", 1);
    }
});