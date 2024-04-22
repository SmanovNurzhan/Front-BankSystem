function show(state){
    document.getElementById('bkgroundOfForm').style.display=state;
    document.getElementById('gray').style.display=state;
}

const form=document.getElementById('f1');
form.addEventListener('submit',saveUser);
function validation(form){
    for(let i=0;i<form.length-1;i++){
        if(form[i].value.trim()==''){
            console.log("Заполните все поля");
            return false;
        }
    }
    if(form.elements['passwd1'].value!=form.elements['passwd2'].value){
        console.log("Пароли не совпадают");
        return false;
    }
    else if(form.elements['phone'].value.length<=10){
        console.log("не верный номер телефона");
        return false;
    }
    return true;
}

async function saveUser(event){
    event.preventDefault();
    if(validation(form)){
        var user={
            username:form.elements['name'].value,
            surname:form.elements['surname'].value,
            phone:form.elements['phone'].value,
            password:form.elements['passwd1'].value
        }
        let JsonForm=JSON.stringify(user);
        try {
            let response = await fetch('http://localhost:8082/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JsonForm
            });
    
            if (response.ok) {
                alert("Вы зарегистрировались!");
                window.location.href = 'first_project.html';
            } else {
                console.error('Ошибка при отправке формы:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    }else{
        alert("Ошибка!");
        window.location.reload();
    }
}

