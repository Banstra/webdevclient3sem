const passwordInp = document.getElementById('passwordInp');

    const modal = document.getElementById('test');
    const closeModalBtn = document.getElementById('closeModalBtn');
const form = document.getElementById('registerForm');
const answer = document.getElementById('response');

function showPassword() {
        passwordInp.type = 'text'
}
function hidePassword() {
        passwordInp.type = 'password'
}



   

    closeModalBtn.addEventListener('click', () => {
      modal.close();
    });
    

    

 modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.close();
      }
    }); 



form.addEventListener('submit', (event) => {
     event.preventDefault(); 

   const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  answer.textContent = JSON.stringify(data, null, 2);
  
});

