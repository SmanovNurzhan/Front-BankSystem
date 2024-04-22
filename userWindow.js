const balance =document.getElementById('balanceh4');
var phone=localStorage.getItem('phone');
window.addEventListener('beforeunload',getBalance); 

async function getBalance(event){
    event.preventDefault();
        try {
            let response = await fetch('http://localhost:8082/users/balance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(phone)
            });
            
            if (response.status === 404) {
                alert("данные не найденны");
            }else if(response.ok){
                    const data = await response.json();
                    balance.textContent = JSON.stringify(data);
            }else{
                alert("хана вообщем");
            }
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
}

