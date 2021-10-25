window.onload = function () {

	// Validate if the variable has equal or more defined length

	function validateMinimumLenght(val, leng) {
		return val.length >= leng;
	};

	// Search for a particular character a in the variable

	function lookForCharacter(variable, a) {
		return variable.indexOf(a) !== -1;
	};

	// Search for a match of the regex in the param value

	function lookForRegex(value, regex) {
		if (value.match(regex)) {
			return true;
		} else {
			return false;
		}
	};

	// Set localStorage items

	function fillLocalStorage() {
		localStorage.setItem('name', inputsData[0].value);
		localStorage.setItem('email', inputsData[1].value);
		localStorage.setItem('password', inputsData[2].value);
		localStorage.setItem('repeatedPassword', inputsData[3].value);
		localStorage.setItem('age', inputsData[4].value);
		localStorage.setItem('phoneNumber', inputsData[5].value);
		localStorage.setItem('address', inputsData[6].value);
		localStorage.setItem('city', inputsData[7].value);
		localStorage.setItem('postalCode', inputsData[8].value);
		localStorage.setItem('dni', inputsData[9].value);
		return;
	};

	// Get data from localStorage

	function getLocalStorage() {
		inputsData[0].value = localStorage.getItem('name');
		inputsData[1].value = localStorage.getItem('email');
		inputsData[2].value = localStorage.getItem('password');
		inputsData[3].value = localStorage.getItem('repeatedPassword');
		inputsData[4].value = localStorage.getItem('age');
		inputsData[5].value = localStorage.getItem('phoneNumber');
		inputsData[6].value = localStorage.getItem('address');
		inputsData[7].value = localStorage.getItem('city');
		inputsData[8].value = localStorage.getItem('postalCode');
		inputsData[9].value = localStorage.getItem('dni');
		return;
	};

	// Functions to handle modal visibility 

	function openModal() {
		modalContainer.style.visibility = 'visible';
		return;
	};

	function closeModal() {
		modalContainer.style.visibility = 'hidden';
		return;
	};

	function clickOutside(e) {
		if (e.target === modalContainer) {
			modalContainer.style.visibility = 'hidden';
			return;
		}
	};

	// Sets fetch response to modal message

	function modalMessageShown(content) {
		console.log(content)
		if (content.status) {
			modalMessage.innerHTML = 'STATUS ' + content.status + ' ' + content.statusText;
			return;
		} else {
			modalMessage.innerHTML = 'The subscription has been succesfull. ' + `${JSON.stringify(content, null, 2)}`;
			return;
		}
	};

	// Fetch function to handle different response.status

	function requestForm(url) {
		fetch(url)
			.then(res => {
				if (res.status === 200) {
					modalTitle.innerHTML = 'subscription succesfully requested';
					fillLocalStorage();
					return res.json();
				} else {
					modalTitle.innerHTML = 'subscription failed on request';
					return res;
				}
			})
			.then(data => {
				modalMessageShown(data);
				openModal();
			})
			.catch(error => {
				modalTitle.innerHTML = 'FETCH FAILED';
				modalMessage.innerHTML = error;
				openModal();
			});
	};

	// General commands

	var errors = document.getElementsByClassName('error');
	var inputsData = document.getElementsByTagName('input');

	// Inicializate global variables

	var nameWarning = 1;
	var emailWarning = 1;
	var passwordWarning = 1;
	var rePasswordWarning = 1;
	var ageWarning = 1;
	var phoneWarning = 1;
	var addressWarning = 1;
	var cityWarning = 1;
	var postalWarning = 1;
	var dniWarning = 1;
	var alertWarning = 0;

	// Regex declarations

	var mailRegex = /@/;
	var dotComRegex = /.com/;
	var symbolsRegex = /([@"'.?*+^$#])/;
	var numbersRegex = /[0-9]/;
	var letterRegex = /[a-z]/i;

	// Hide the error message on Focus

	for (var i = 0; i <= 9; i++) {
		let messages = errors[i];
		inputsData[i].onfocus = function () {
			messages.style.visibility = "hidden";
		}
	};

	// Call function to change input values from localStorage

	getLocalStorage();

	// Changing message of the greetings

	var message = document.getElementsByClassName('greetings')[0];
	var inputName = inputsData[0];
	inputName.onkeyup = function (e) {
		message.innerHTML = 'Hello ' + e.target.value;
	};

	// Validate fullname

	inputsData[0].onblur = validateName;
	function validateName() {
		var name = inputsData[0].value;
		var result = validateMinimumLenght(name, 6);
		var gotBlank = lookForCharacter(name, ' ');
		var doesItHaveANumber = lookForRegex(name, numbersRegex);
		var doesItHaveASimbol = lookForRegex(name, symbolsRegex);
		if (result && gotBlank && !doesItHaveANumber && !doesItHaveASimbol) {
			nameWarning = 0;
			return;
		} else {
			errors[0].style.visibility = 'visible';
			nameWarning = 1;
			return;
		}
	};

	// Validate email

	inputsData[1].onblur = validateEmail;
	function validateEmail() {
		var email = inputsData[1].value;
		var gotDotCom = lookForRegex(email, dotComRegex);
		var gotEmailChar = lookForRegex(email, mailRegex);
		if (gotDotCom && gotEmailChar) {
			emailWarning = 0;
			return;
		} else {
			errors[1].style.visibility = 'visible';
			emailWarning = 1;
			return;
		}
	};

	// Validate password

	inputsData[2].onblur = validatePassword;
	function validatePassword() {
		var pass = inputsData[2].value;
		var passLength = validateMinimumLenght(pass, 8);
		var isItANumber = pass % 1;
		var doesItHaveANumber = lookForRegex(pass, numbersRegex);
		var doesItHaveASimbol = lookForRegex(pass, symbolsRegex);
		if (isNaN(isItANumber) && passLength && doesItHaveANumber && !doesItHaveASimbol) {
			passwordWarning = 0;
			return;
		} else {
			errors[2].style.visibility = 'visible';
			passwordWarning = 1;
			return;
		}
	};

	// Validate repeat password

	inputsData[3].onblur = validateRepPassword;
	function validateRepPassword() {
		var pass = inputsData[2].value;
		var rPass = inputsData[3].value;
		var isSamePass = lookForCharacter(rPass, pass);
		if (isSamePass && pass.length === rPass.length) {
			rePasswordWarning = 0;
			return;
		} else {
			errors[3].style.visibility = 'visible';
			rePasswordWarning = 1;
			return;
		}
	};

	// Validate Age

	inputsData[4].onblur = validateAge;
	function validateAge() {
		var age = inputsData[4].value;
		var isItANumber = age % 1;
		if (age >= 18 && !isItANumber) {
			ageWarning = 0;
			return;
		} else {
			errors[4].style.visibility = 'visible';
			ageWarning = 1;
			return;
		}
	};

	// Validate phone number

	inputsData[5].onblur = validatePhoneNumber;
	function validatePhoneNumber() {
		var phoneNumber = inputsData[5].value;
		var isItANumber = phoneNumber % 1;
		var result = validateMinimumLenght(phoneNumber, 7);
		if (!isItANumber && result) {
			phoneWarning = 0;
			return;
		} else {
			errors[5].style.visibility = 'visible';
			phoneWarning = 1;
			return;
		}
	};

	// Validate Address

	inputsData[6].onblur = validateAddress;
	function validateAddress() {
		var address = inputsData[6].value;
		var addressLengthOk = validateMinimumLenght(address, 5);
		var doesItHaveANumber = lookForRegex(address, numbersRegex);
		var doesItHaveALetter = lookForRegex(address, letterRegex);
		var gotBlank = lookForCharacter(address, ' ');
		if (addressLengthOk && doesItHaveALetter && doesItHaveANumber && gotBlank) {
			addressWarning = 0;
			return;
		} else {
			errors[6].style.visibility = 'visible';
			addressWarning = 1;
			return;
		}
	};

	// Validate city of resident

	inputsData[7].onblur = validateCity;
	function validateCity() {
		var city = inputsData[7].value;
		var cityLength = validateMinimumLenght(city, 3);
		if (cityLength) {
			cityWarning = 0;
			return;
		} else {
			errors[7].style.visibility = 'visible';
			cityWarning = 1;
			return;
		}
	};

	// Validate Postal Code

	inputsData[8].onblur = validatePostal;
	function validatePostal() {
		var postalCode = inputsData[8].value;
		var result = validateMinimumLenght(postalCode, 3);
		if (result) {
			postalWarning = 0;
			return;
		} else {
			errors[8].style.visibility = 'visible';
			postalWarning = 1;
			return;
		}
	};

	// Validate DNI 

	inputsData[9].onblur = validateDni;
	function validateDni() {
		var dni = inputsData[9].value;
		var dniLength1 = validateMinimumLenght(dni, 7);
		var dniLength2 = validateMinimumLenght(dni, 9);
		var dniIsNumber = dni % 1;
		if (dniLength1 & !dniLength2 & dniIsNumber === 0) {
			dniWarning = 0;
			return;
		} else {
			errors[9].style.visibility = 'visible';
			dniWarning = 1;
			return;
		}
	};

	// Validate submit

	var formButton = document.getElementsByTagName('button')[0];

	formButton.addEventListener('click', submitVal);

	function submitVal() {
		var messageAlert = [];
		if (nameWarning === 1) {
			messageAlert.push('Name: ' + errors[0].innerHTML);
			alertWarning = 1;
		}
		if (emailWarning === 1) {
			messageAlert.push('E-mail: ' + errors[1].innerHTML);
			alertWarning = 1;
		}
		if (passwordWarning === 1) {
			messageAlert.push('Password: ' + errors[2].innerHTML);
			alertWarning = 1;
		}
		if (rePasswordWarning === 1) {
			messageAlert.push('Repeat Password: ' + errors[3].innerHTML);
			alertWarning = 1;
		}
		if (ageWarning === 1) {
			messageAlert.push('Age: ' + errors[4].innerHTML);
			alertWarning = 1;
		}
		if (phoneWarning === 1) {
			messageAlert.push('Phone Number: ' + errors[5].innerHTML);
			alertWarning = 1;
		}
		if (addressWarning === 1) {
			messageAlert.push('Address: ' + errors[6].innerHTML);
			alertWarning = 1;
		}
		if (cityWarning === 1) {
			messageAlert.push('City of residence: ' + errors[7].innerHTML);
			alertWarning = 1;
		}
		if (postalWarning === 1) {
			messageAlert.push('Postal Number: ' + errors[8].innerHTML);
			alertWarning = 1;
		}
		if (dniWarning === 1) {
			messageAlert.push('DNI: ' + errors[9].innerHTML);
			alertWarning = 1;
		}
		if (alertWarning === 1) {
			alert('Submit failed. Wrong data entry in the category of: \n' + messageAlert.join('\n'));
			alertWarning = 0;
		} else {
			var httpUrlFirstPart = 'https://curso-dev-2021.herokuapp.com/newsletter?';
			var queryParamsName = ['name=', 'emaile=', 'password=', 'repeatPassword=', 'age=', 'phoneNumber=', 'adress=', 'city=', 'postalCode=', 'dni='];
			var queryParams = [];
			for (var i = 0; i < 9; i++) {
				queryParams.push(queryParamsName[i] + inputsData[i].value)
			};
			var queryParamsComplete = queryParams.join('&');
			var httpUrl = httpUrlFirstPart + queryParamsComplete;
			requestForm(httpUrl);
		};
	};

	// Modal part

	var modalContainer = document.getElementsByClassName('modal-container')[0];
	var closeBtn = document.getElementsByClassName('modal-close-btn')[0];
	var modalMessage = document.getElementsByClassName('modal-message')[0];
	var modalTitle = document.getElementsByClassName('modal-title')[0];
	closeBtn.addEventListener('click', closeModal);
	window.addEventListener('click', clickOutside);

};
