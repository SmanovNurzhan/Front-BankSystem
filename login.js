const form2=document.getElementById('f2');
form2.addEventListener('submit',checkUser);

function validationLogin(form){
    for(let i=0;i<form.length-1;i++){
        if(form[i].value.trim()==''){
            console.log("Заполните все поля");
            return false;
        }
    }
    if(form.elements['phone'].value.length<=10){
        console.log("не верный номер телефона");
        return false;
    }
    return true;
}

async function checkUser(event){
    event.preventDefault();
    if(validationLogin(form2)){
        var userLogin={
            phone:form2.elements['phone'].value,
            password:form2.elements['passwd1'].value
        }
        let JsonLogin=JSON.stringify(userLogin);
        try {
            let response = await fetch('http://localhost:8082/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JsonLogin
            });
            
            if (response.status === 404) {
                alert("не верные данные");
                window.location.reload();
            }else if(response.ok){
                localStorage.setItem('phone',userLogin.phone);
                window.location.href='usersWindow.html';
            }else{
                alert("хана вообщем");
            }
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    }else{
        alert("Ошибка входа!");
        window.location.reload();
    }
}