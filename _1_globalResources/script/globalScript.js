const menuBar = document.querySelector('.menuBar');
const lockScroll = document.querySelector('.lockScroll');
const links = document.querySelectorAll('.direct a');
const direct = document.querySelector('.direct');
const darkMode = document.querySelector('.i_1');
const getOut = document.querySelector('.i_2');
const hideGetOut = document.querySelector('.confirmGetOut');
const confirmExit = document.querySelector('.confirm');
const cancelExit = document.querySelector('.cancel');
const toggleModeBody = document.querySelector('body')
const toggleModeHeader = document.querySelector('header');
const toggleModeIcons = document.querySelectorAll('.theme')
const toggleModeLink = document.querySelectorAll('.direct li')

// functions 

// function hideMenuClick(){
//     direct.classList.toggle('hide');
// }

links.forEach(item => {
    item.addEventListener('click', () => {
        //hideMenuClick();
    direct.classList.toggle('hide');

    })
})

const configModeDark = () =>{
    
    toggleModeBody.classList.toggle('body_dark');
    toggleModeHeader.classList.toggle('dark');

    toggleModeIcons.forEach(item => {
        item.classList.toggle('themeColor');
    });

    toggleModeLink.forEach(item => {
        item.classList.toggle('li_dark');
    });
}

const veriryDarkMode = () =>{
    const darkMode = localStorage.getItem("dark");

    if(darkMode){
        configModeDark();
    }
}

//Events

menuBar.addEventListener('click', () => {
    //hideMenuClick();
    direct.classList.toggle('hide');
    console.log(1);

})

darkMode.addEventListener('click', () => {
    configModeDark();

    localStorage.removeItem("dark")
    if(toggleModeHeader.classList.contains("dark")){
        localStorage.setItem("dark", 1);
    }
});


getOut.addEventListener('click', () => {
    console.log(1)
    hideGetOut.classList.remove('hide_confirm');
    lockScroll.classList.remove('hide_confirm');
    
    confirmExit.addEventListener('click', () => {

        let cnpj = 00;
        let key = 'cnpj';
        
        localStorage.setItem(key, cnpj);
        
    })
    cancelExit.addEventListener('click', () => {
        hideGetOut.classList.add('hide_confirm');
        lockScroll.classList.add('hide_confirm');
        // console.log(1)
    })

});

veriryDarkMode();


