window.onload = function () {

	//Validate if the variable has equal or more defined length

	function validateMinimumLenght(val, leng) {
		if (val.length >= leng) {
			return 1;
		} else {
			return 0;
		}
	};

	// Search for a particular character a in the variable

	function lookForCharacter(variable, a) {
		if (variable.indexOf(a) !== -1) {
			return 1;
		} else {
			return 0;
		}
	};

	// Search for a match of the regex in the param value

	function lookForRegex(value, regex) {
		if (value.match(regex)) {
			return 1;
		} else {
			return 0;
		}
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
		if (result === 1 && gotBlank === 1 && doesItHaveANumber !== 1 && doesItHaveASimbol === 0) {
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
		if (gotDotCom === 1 && gotEmailChar === 1) {
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
		if (isNaN(isItANumber) && passLength === 1 && doesItHaveANumber === 1 && doesItHaveASimbol === 0) {
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
		if (isSamePass === 1 && pass.length === rPass.length) {
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
		if (age >= 18 && isItANumber === 0) {
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
		if (isItANumber === 0 && result === 1) {
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
		if (addressLengthOk === 1 && doesItHaveALetter === 1 && doesItHaveANumber === 1 && gotBlank === 1) {
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
		if (cityLength === 1) {
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
		if (result === 1) {
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
		if (dniLength1 + dniLength2 === 1 & dniIsNumber === 0) {
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
		var dataOkValues = ['The next information is going to submit: '];
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
			for (var i = 0; i < inputsData.length; i++) {
				dataOkValues.push(inputsData[i].value);
			}
			alert(dataOkValues.join('\n'));
		}
	}
};
