const baseURL = 'http://localhost:4000';
const mainURL = 'http://localhost:3000';

function validateEmail(email) {
            // Regular expression to validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

function validatePassword(password) {
            // Password should be at least 8 characters long
            return password.length >= 8;
        }  





 const loginText = document.querySelector(".title-text .login");
      const loginForm = document.querySelector("form.login");
      const loginBtn = document.querySelector("label.login");
      const signupBtn = document.querySelector("label.signup");
      const signupLink = document.querySelector("form .signup-link a");
      signupBtn.onclick = (()=>{
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
      });
      loginBtn.onclick = (()=>{
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
      });
      signupLink.onclick = (()=>{
        signupBtn.click();
        return false;
      });
const loginEmailInput = document.getElementById('loginEmail');
const loginPasswordInput = document.getElementById('loginPassword');
const loginButton = document.getElementById('loginButton');

const signupEmailInput = document.getElementById('signupEmail');
const signupPasswordInput = document.getElementById('signupPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const signupButton = document.getElementById('signupButton');
const signupName=document.getElementById('signupName');

// Add event listeners to the forms
loginButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the form from submitting
  const loginEmail = loginEmailInput.value;
  const loginPassword = loginPasswordInput.value;
  // Now you can use loginEmail and loginPassword for further processing
  const userData = {
              email: loginEmail,
              password: loginPassword
              };
            if (!validateEmail(loginEmail)) {
                alert("Invalid email format. Please enter a valid email address.");
                return;
            }

            if (!validatePassword(loginPassword)) {
                alert("Password must be at least 8 characters long.");
                return;
            }
           
			            
			fetch(`${baseURL}/cart/login`, {
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			    
			  },
			  body: JSON.stringify(userData),
			 
			})
			.then((response) => {
			  if (response.ok) {
			    // Successful login, you can now access protected resources
			    console.log('Login successful');
                window.location.href = `${mainURLB}/`;
			  } else {
			    // Handle login error
			    console.error('Login error:', response.status, response.statusText);
			  }
			})
			.catch(error => {
			  console.error('Fetch error:', error);
			})

});

signupButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the form from submitting
  const signupEmail = signupEmailInput.value;
  const signupPassword = signupPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const name=signupName.value;
  const userData = {
              name: name,
              email: signupEmail,
              password: signupPassword
              };
  fetch(`${baseURL}/cart/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(() => {
                // No need to handle response data
                // Simply navigate to the payment page
            window.location.href = 'account.html';
                })
            .catch(error => {
                console.error('Error:', error);
            });             

  


});