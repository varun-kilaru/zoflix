var users;
if(!localStorage.getItem("users"))
	users=[];
else
	users=JSON.parse(localStorage.getItem("users"));

var registerUser = document.querySelector("#registerBtn");
registerUser.addEventListener('click', function(e){
	e.preventDefault();
	var user_obj={};
	var allInp = document.querySelectorAll("#register-form input");
	allInp.forEach((inp)=>{
		// console.log(inp);
		if(inp.value!=""){
			user_obj[inp.name]=inp.value;
			// inp.value="";
		}
		else{
			alert(inp.name+" is required");
		}
	});
	// console.log(user_obj);
	if(validateRegUser(user_obj)){
		users.push(user_obj);
		localStorage.setItem("users", JSON.stringify(users));
		alert('Registered Successfully!!');
		formReset(allInp);
		redirectToLogin();
		// console.log(users);
	}
	else
		alert('Check the entered Details!!!');
});


function validateRegUser(userObj){
	// console.log(userObj);
	// console.log(userObj["username"].length);
	var regMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var regPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
	if(userObj["username"].length < 4){
		alert('Username is Invalid\nUsername must be of atleast 5 charcaters.');
		return false;
	}
	else if(regMail.test(userObj["email"]) == false){
		alert('Email is invalid\nCheck Email Once!');
		return false;
	}
	else if(userObj["pass"].length>4 && userObj["cnfrmPass"].length>4){
		// if(regPass.test(userObj["password"])==false || regPass.test(userObj["cnfrm-password"])==false){
		// 	alert('Passwords should contain at least one number and one uppercase and lowercase letter');
		// 	return false;
		// }
		if(userObj["pass"]!=userObj["cnfrmPass"]){
			alert('Passwords do not match')
			return false;
		}
	}
	else{
		alert('Passwords should be of atleast 5 characters.');
		return false;
	}
	return true;
}


function redirectToLogin(){
	var regVeiw = document.querySelector("#register-veiw");
	var loginVeiw = document.querySelector("#login-veiw");
	var homeVeiw=document.querySelector("#home-veiw");

	var navUser = document.querySelector("#nav-username");
	navUser.innerText="";
	var logout = document.querySelector("#nav-logout");
	logout.innerText="";

	regVeiw.style.display="none";
	homeVeiw.style.display="none";
	loginVeiw.style.display="block";
	// currentUser={}; 
	resetAllInp();
}

function resetAllInp(){
	var allInp=document.querySelectorAll("input:not(#edit-inpR)");
	allInp.forEach((inp)=>{
		inp.value="";
	});
}


// console.log(users);
