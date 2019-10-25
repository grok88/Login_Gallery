/* 
*  Схема инициализации приложения
*/
let validatorModule = new Validator();
console.log(validatorModule);
validatorModule.setLogAndPass(database);
validatorModule.initial();


let galleryModule = new ExtendedGallery();
galleryModule.initListeners();

// let loginForm = new LoginForm(validatorModule, galleryModule);
// loginForm.initComponent(); 