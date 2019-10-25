function Validator(){
	this.DOMElems = {
		form : document.querySelector('.form-signin'),
		email : document.querySelector('#inputEmail'),
		password : document.querySelector('#inputPassword'),
		remember : document.querySelector('.remember'),
		alert : document.querySelector('.alert'),
		alertPass : document.querySelector('.alert-pass'),
		main : document.querySelector('main')
	}
}

Validator.prototype = {
	//edit pass
	editPass : function(pass){
		return pass.replace(/./g,'*');
	},
	// Show - hide pass
	showHidePass : function(e){
		let target = e.target;
		if (target.id !== 'btn-pass') return;
		
		let btnPass = document.querySelector('.btn-pass');
		let pass = document.querySelector('.user-pass');

		pass.textContent = this.DOMElems.password.value;
		btnPass.textContent = "Скрыть пароль";
		
		
		if(btnPass.classList.contains('hideBtn')){
			btnPass.textContent = "Показать пароль";
			pass.textContent = this.editPass(this.DOMElems.password.value);
		}

		btnPass.classList.toggle('hideBtn');
	},
	//Add User info
	addUserInfo : function(login,pass){
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
					<td><span class ='user-pass'>${this.editPass(pass)}</span></td>
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

		this.DOMElems.main.append(div);
	},
	//checkUSers
	checkUsers : function(login,pass){
		let loginVal = login.toLowerCase();
		let passVal = pass.toLowerCase();

		let date = JSON.parse(localStorage.getItem('checkUser'));

		let check = date.filter(elem => {
			if (elem.login.toLowerCase() !== loginVal && elem.pass != passVal){				
				return false;
			} else {
				return true;
			}
		});
		
		if (check.length != 0) {
			this.DOMElems.alertPass.style.display = 'none';
			console.log(`Success`);

			this.DOMElems.form.style.display = 'none';
			this.addUserInfo(login,pass);
		} else {
			console.log('error');
			this.DOMElems.alertPass.style.display = 'block';
			setTimeout(() => this.DOMElems.alertPass.style.display = 'none',3000);
		};
	},
	// BackBtn
	BackBtn : function (e){
		let target = e.target;

		if (target.id !== 'btn-back') return;

		document.querySelector('.user-info').remove();
		this.DOMElems.form.style.display = 'block';
	},
	// handler
	handler : function (e){
		const loginValue = this.DOMElems.email.value;
		const passValue = this.DOMElems.password.value;

		if (loginValue !== "" && passValue !== ""){
			this.checkUsers(loginValue,passValue);
		} else {
			this.DOMElems.form.before(this.DOMElems.alert);
			this.DOMElems.alert.style.display = 'block';

			if (loginValue == ''){
				this.DOMElems.email.focus();
			}
			setTimeout(() => this.DOMElems.alert.style.display = 'none',3000);
		}

		e.preventDefault();
	},
	//setLogAndPass 
	setLogAndPass : function(database){
		let res = JSON.stringify(database);
		localStorage.setItem('checkUser',res);
	},
	// save login and pass to local storage
	rememberLS : function(e){
		if (this.DOMElems.remember.checked){
			const loginValue = this.DOMElems.email.value;
			const passValue = this.DOMElems.password.value;
			let temp = [];
			temp.push(loginValue,passValue); 
			localStorage.setItem('temp', JSON.stringify(temp));
		} else {
			localStorage.removeItem('temp');
		}
	},	
	tempShow : function(e){
		if (localStorage.getItem('temp') === null) return;
		let [login, pass] = JSON.parse(localStorage.getItem('temp'));
		this.DOMElems.email.value = login;
		this.DOMElems.password.value = pass;
	},
	//load all Events
	initial : function(){
		document.addEventListener('DOMContentLoaded', this.tempShow.bind(this));
		this.DOMElems.form.addEventListener('submit', this.handler.bind(this));
		this.DOMElems.main.addEventListener('click', this.showHidePass.bind(this));
		this.DOMElems.main.addEventListener('click', this.BackBtn.bind(this));
		this.DOMElems.remember.addEventListener('change', this.rememberLS.bind(this));
	}
}
