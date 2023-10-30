// hàm - đối tượng 
function Validator(options){
   // ham thuc hien  validate 
   function Validate(inputElement,rule){
      var errorMessage = rule.test(inputElement.value);
      var errorElement = inputElement.parentElement.querySelector('.form-message');
      if (errorMessage){
         errorElement.innerText = errorMessage;
         inputElement.parentElement.classList.add('invalid');
      }else{
         errorElement.innerText = '';
         inputElement.parentElement.classList.remove('invalid');
      }
   }

// lay elemen cua form 
   var formElement = document.querySelector(options.form);
   if(formElement){
              formElement.onsubmit = function(e){
               e.preventDefault();
               options.rules.forEach(function(rule){
                  var inputElement = formElement.querySelector(rule.selector); 
                  Validate(inputElement, rule);
               })
                  
               }
              

      options.rules.forEach(function(rule) {
             var inputElement = formElement.querySelector(rule.selector);
            //  tu input quay lai thang cha roi goi vao thang con 
             if(inputElement){
               //   xu ly khi click ra khoi input 
                inputElement.onblur = function(){
                  // value : inputElemen 
                  // test function :rule.test 
                   Validate(inputElement, rule);
             }
             // xu ly khi nguoi dung nhap vao input
             inputElement.oninput = function(){
               var errorElement = inputElement.parentElement.querySelector('.form-message');
               errorElement.innerText = '';
               inputElement.parentElement.classList.remove('invalid');
             }
             }
      });
   }
  
}

// định nghĩa rules 
// nguyen tac cua rule 
// 1.khi co loi thi tra ra messae loi
// 2,khi hop le thi ko tra ra 
// trim() loai bo dau cach 
Validator.isRequired = function(selector){
         return{
            selector : selector,
            test(value){
                return value.trim() ? undefined : 'Vui lòng nhập Họ Và Tên';
            }
         }
}
Validator.isEmail = function(selector){
         return{
            selector : selector,
            test(value){
               var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
               return regex.test(value) ? undefined : 'Vui lòng nhập Email'
            }
         }
}
Validator.ispassword = function(selector){
   return{
      selector : selector,
      test(value){
         var pw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
         return pw.test(value) ? undefined : 'Vui lòng nhập mật khẩu từ 6 đến 20 ký tự, trong đó có ít nhất một chữ số , một chữ hoa và một chữ thường'
      }
   }
}
Validator.isconfirmed = function(selector,getConfirmValue,message){
   return{
      selector : selector,
      test(value){
         return value === getConfirmValue() ? undefined : message || 'Mời nhập lại mật khẩu'
        
      }
   }
}