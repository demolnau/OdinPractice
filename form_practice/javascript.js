var submit = document.getElementById("submit")
var password_input = document.getElementById("password_input")
var passwordConfirmation = document.getElementById("password-confirmation")
var message = document.getElementById("message")



// When the user clicks on the password field, show the message box
password_input.onfocus=function(){
    message.style.display = "block";
    //console.log("focusing on password input")
}
// When the user clicks outside of the password field, hide the message box
password_input.onblur = function() {
    message.style.display = "none";
    //console.log("clicked off of the password field")
  }

  
//just for testing

function toggle_validity(password_validity, text){
  if(text=="valid"){
    password_validity.classList.remove("invalid")
    password_validity.classList.add("valid")
    console.log("password is valid")
  }
  else{
    password_validity.classList.remove("valid")
    password_validity.classList.add("invalid")
    console.log("password is INVALID")
  }
}

function compare_passwords(password1,password2){
  if(password1.value==password2.value){
    console.log("password and password confirmation match")
    console.log("password is set to:"+ password1.value)
    toggle_validity(password1, "valid")
    toggle_validity(password2,"valid")
  }
  else{
    toggle_validity(password1, "invalid")
    toggle_validity(password2, "invalid")
    console.log("Password and password confirmation DO NOT match!")
    //alert("passwords do not match")
  }
}


submit.onclick = function(){
  compare_passwords(password_input,passwordConfirmation)
}


function whenClicked(){
  showPassword(password_input)
  showPassword(passwordConfirmation)
}

function showPassword(toChange) {
  if (toChange.type==='password'){
    toChange.type = 'text';
  }
  else{
    toChange.type ='password'
  }
  }
