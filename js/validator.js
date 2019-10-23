let loginForm = (function(){
	let DOMElems = {
		form : document.querySelector('.form-signin'),
		email : document.querySelector('#inputEmail'),
		password : document.querySelector('#inputPassword'),
		remember : document.querySelector('.remember'),
		alert : document.querySelector('.alert'),
		alertPass : document.querySelector('.alert-pass'),
		main : document.querySelector('main')
	}

	//edit pass
	function editPass(pass){
		return pass.replace(/./g,'*');
	}

	// Show - hide pass
	function showHidePass(e){
		let target = e.target;
		if (target.id !== 'btn-pass') return;
		
		let btnPass = document.querySelector('.btn-pass');
		let pass = document.querySelector('.user-pass');

		pass.textContent = DOMElems.password.value;
		btnPass.textContent = "Скрыть пароль";
		
		
		if(btnPass.classList.contains('hideBtn')){
			btnPass.textContent = "Показать пароль";
			pass.textContent = editPass(DOMElems.password.value);
		}

		btnPass.classList.toggle('hideBtn');
	}

	//Add User info
	function addUserInfo(login,pass){
		const div = document.createElement('div');
		div.className = 'user-info';

		const table = `
		<table class="table">			
			<thead>
				<tr>
					<th>Email</th>
					<th>Пароль</th>
					<th>Показать - скрыть пароль</th>
				</tr>
			</thead>
			<tbody id="table-content">
				<tr>
					<td class='user-login'>${login}</td>
					<td><span class ='user-pass'>${editPass(pass)}</span></td>
					<td><button type = "button" class="btn-pass" id="btn-pass" >Показать пароль</button></td>
				</tr>
			</tbody>
		</table>
		`;

		div.innerHTML = table;

		// button back
		let btnBack = document.createElement('button');
		btnBack.id = "btn-back";
		btnBack.textContent = 'Back';
		
		div.append(btnBack);

		DOMElems.main.append(div);
	}

	//checkUSers
	function checkUsers(login,pass){
		let loginVal = login.toLowerCase();
		let passVal = pass.toLowerCase();

		let date = JSON.parse(localStorage.getItem('checkUser'));

		date.forEach(elem => {
			if (elem.login.toLowerCase() !== loginVal && elem.pass != passVal){
				console.log('error');
				DOMElems.alertPass.style.display = 'block';
				setTimeout(() => DOMElems.alertPass.style.display = 'none',3000);
			} else {
				
				DOMElems.alertPass.style.display = 'none';
				console.log(`Success`);

				DOMElems.form.style.display = 'none';
				addUserInfo(login,pass);
			}
		});
	}

	// BackBtn
	function BackBtn(e){
		let target = e.target;

		if (target.id !== 'btn-back') return;

		document.querySelector('.user-info').remove();
		DOMElems.form.style.display = 'block';
	}

	// handler
	function handler(e){
		const loginValue = DOMElems.email.value;
		const passValue = DOMElems.password.value;

		if (loginValue !== "" && passValue !== ""){
			console.log(2);
			checkUsers(loginValue,passValue);
		} else {
			console.log(1);
			DOMElems.form.before(DOMElems.alert);
			DOMElems.alert.style.display = 'block';

			if (loginValue == ''){
				DOMElems.email.focus();
			}
			setTimeout(() => DOMElems.alert.style.display = 'none',3000);
		}

		e.preventDefault();
	}

	//setLogAndPass 
	function setLogAndPass (data){
		let res = JSON.stringify(data);
		localStorage.setItem('checkUser',res);
	}

	// save login and pass to local storage
	function rememberLS(e){
		if (DOMElems.remember.checked){
			const loginValue = DOMElems.email.value;
			const passValue = DOMElems.password.value;
			let temp = [];
			temp.push(loginValue,passValue); 
			localStorage.setItem('temp', JSON.stringify(temp));
		} else {
			localStorage.removeItem('temp');
		}
	}

	//	
	function tempShow(e){
		if (localStorage.getItem('temp') === null) return;
		let [login, pass] = JSON.parse(localStorage.getItem('temp'));
		DOMElems.email.value = login;
		DOMElems.password.value = pass;
	}
	//load all Events
	function initial(){
		document.addEventListener('DOMContentLoaded', tempShow)
		DOMElems.form.addEventListener('submit', handler);
		DOMElems.main.addEventListener('click', showHidePass);
		DOMElems.main.addEventListener('click', BackBtn);
		DOMElems.remember.addEventListener('change', rememberLS);
	}

	return {
		initComponent : initial(),
		setLogAndPass : setLogAndPass(data)
	}
})();