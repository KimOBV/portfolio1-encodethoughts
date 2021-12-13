const form = document.querySelector('#form'),
  name = document.querySelector('#name'),
  errorName = document.querySelector('#errorName'),
  subject = document.querySelector('#subject'),
  errorSubject = document.querySelector('#errorSubject'),
  message = document.querySelector('#message'),
  errorMessage = document.querySelector('#errorMessage'),
  email = document.querySelector('#email'),
  errorEmail = document.querySelector('#errorEmail'),
  succsess = document.querySelector('.succsess');

function validateForm(event) {
  event.preventDefault();

  let failedValidation = true;

  if (lenghtControl(name.value, 5) === true) {
    errorName.style.display = 'none';
  } else {
    errorName.style.display = 'block';
    failedValidation = false;
  }

  if (lenghtControl(subject.value, 14) === true) {
    errorSubject.style.display = 'none';
  } else {
    errorSubject.style.display = 'block';
    failedValidation = false;
  }

  if (lenghtControl(message.value, 24) === true) {
    errorMessage.style.display = 'none';
  } else {
    errorMessage.style.display = 'block';
    failedValidation = false;
  }

  if (emailValidation(email.value) === true) {
    errorEmail.style.display = 'none';
  } else {
    errorEmail.style.display = 'block';
    failedValidation = false;
  }

  if (failedValidation === true) {
    succsess.style.display = 'block';
    setTimeout(() => {
      document.location.reload(true);
    }, 2500);
  } else {
    succsess.style.display = 'none';
  }
}
form.addEventListener('submit', validateForm);
function lenghtControl(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}
function emailValidation(email) {
  const format = /\S+@\S+\.\S+/;
  const checkFormat = format.test(email);
  return checkFormat;
}
