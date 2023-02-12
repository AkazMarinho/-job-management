const url = "http://localhost:8080/api/v1";

const butColorTh = document.querySelector('.i_1');
const allTh = document.querySelectorAll('th')
const insertTable = document.querySelector('#table');
const txtSearch = document.querySelector('#txtSearch');


const colorTh = () => {

    const darkMode = localStorage.getItem("dark");
    
    allTh.forEach(item => {
            if(darkMode == 1){
            
                item.classList.add('tdNewColor');
    
            } else if (!darkMode){
                item.classList.remove('tdNewColor');
            }
        })
}

butColorTh.addEventListener("click", () => {
    colorTh();

})

async function getListEmployee ( cnpj ) {
    
    const result = await fetch(`${url}/employee/find-all-by-manager/${cnpj}`);
    console.log(result.status);
    const dados = await result.json();

    dados.map((dado) => {
        const tr = document.createElement('tr');
        tr.classList.add('tr');
        //console.log(dado);

        const td1 = document.createElement('td');
        td1.classList.add('row_1');
        td1.classList.add('b');
        const td2 = document.createElement('td');
        td2.classList.add('row_2');
        td2.classList.add('b');

        const td3 = document.createElement('td');
        td3.classList.add('row_3');
        const linkEdit = document.createElement('a');
        linkEdit.setAttribute("href", '../_2_attEmployee/attEmployeesPage.html')
        const iconEdit = document.createElement('i');
        iconEdit.classList.add('uil-file-edit-alt');

        let td4 = document.createElement('td');
        td4.classList.add('row_4');

        const container_circle = document.createElement('div');
        container_circle.classList.add('container-circle');

        const circle = document.createElement('div');

        td1.innerText = dado.ename;
        td2.innerText = dado.eemail;

        //console.log(dado);
        
        linkEdit.appendChild(iconEdit);
        td3.appendChild(linkEdit);
        container_circle.appendChild(circle);
        td4.appendChild(container_circle);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        

        insertTable.appendChild(tr);

        if(dado.isActive == 1){
            circle.classList.add('greenCircle');
            circle.classList.remove('redCircle');
        }else {
            circle.classList.remove('greenCircle');
            circle.classList.add('redCircle');
        }

        let cpf = dado.cpf;
        
        linkEdit.addEventListener("click", () => {
            localStorage.setItem("cpf", cpf)

            let valueCpf = localStorage.getItem("cpf");
            console.log(valueCpf);
        })


    })

    
    
    const tr = document.querySelectorAll('.tr');
    

    txtSearch.addEventListener("keyup", () => {
        
        let search = txtSearch.value.toLowerCase();
        
        for(let i = 0; i < tr.length; i++){
            var find = false;
            var tableRow = tr[i];
            var tableData = tableRow.childNodes;
            
            tableData.forEach(item => {
                console.log(item.textContent);

                for(let l = 0; l < tableData.length - 2; l++){
                    var value = tableData[l].textContent;

                    if(value.indexOf(search) >= 0){
                        find = true;
                    }
                }

                if(find){
                    tableRow.style.display = ('table-row');
                }else{
                    
                    tableRow.style.display = ('none')
                }
            })
            
            
        }

        
    })
}
const cnpj = localStorage.cnpj;



getListEmployee(cnpj);

const font = document.querySelector('font');
console.log(font);

if (font) {
    row1 = document.querySelector('row_1');
    row1.innerHTML = dado.ename;
    //font.style.display = "none";
}
