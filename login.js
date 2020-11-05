var currentUser;
if(!localStorage.getItem("currentUser"))
	currentUser={};
else
	currentUser=JSON.parse(localStorage.getItem("currentUser"));

var admin={'email':"user@admin.com",'pass':"admin@123"};


var loginToReg = document.querySelector("#loginToReg");
loginToReg.addEventListener('click', function(e){
	redirectToRegister();
});


var loginUser = document.querySelector("#loginBtn");
loginUser.addEventListener('click', function(e){
	e.preventDefault();
	var user_obj={};
	var allInp = document.querySelectorAll("#login-form input");
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
	if(validateLoginUser(user_obj)){
		if(isAdmin(user_obj)){
			user_obj["isAdmin"]=true;
			user_obj["isLogged"]=true;
		}
		else{
			user_obj["isAdmin"]=false;
			user_obj["isLogged"]=true;
		}
		currentUser=user_obj;
		localStorage.setItem("currentUser", JSON.stringify(currentUser));
		alert('Login Successfully!!');
		formReset(allInp);
		redirectToHome();
		// console.log(currentUser);
	}
	else
		alert('Login Unsuccessful!\nCheck entered Details!');
});

if(currentUser["isLogged"])
	document.addEventListener('load', redirectToHome());


function validateLoginUser(userObj){
	var flag=false;
	// console.log(userObj);
	var regMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if(regMail.test(userObj["email"]) == false){
		alert('Email is Invalid\nCheck Email Once!');
		return flag;
	}
	if(userObj["pass"].length<5){
		alert('Password should be of atleast 5 characters.');
		return flag;
	}
	users.forEach((user)=>{
		if(user["email"]===userObj["email"] && user["pass"]===userObj["pass"])
			flag=true;
	});
	if(isAdmin(userObj))
		flag=true;
	if(flag == false)
		alert("You Don't have an Account yet.\nor\nCheck Email and Password!");
	return flag;
}


function isAdmin(obj){
	// console.log(obj);
	if(obj["email"]==admin["email"] && obj["pass"]==admin["pass"])
		return true;
	else
		return false;
}


function showAddMve(){
	var addMve=document.querySelector("#add-mve");
	if(currentUser["isAdmin"]){
		addMve.style.display="block";
	}
	else{
		addMve.style.display="none";
	}
}


function redirectToHome(){
	var homeVeiw = document.querySelector("#home-veiw");
	var loginVeiw = document.querySelector("#login-veiw");
	var navUser = document.querySelector("#nav-username");
	navUser.innerText=currentUser["email"];
	var logout = document.querySelector("#nav-logout");
	logout.innerText="Logout";
	logout.addEventListener('click', function(e){
		redirectToLogin();
	});
	showAddMve();
	loginVeiw.style.display="none";
	homeVeiw.style.display="block"; 
}


function redirectToRegister(){
	var navUser = document.querySelector("#nav-username");
	navUser.innerText="";
	var logout = document.querySelector("#nav-logout");
	logout.innerText="";
	var regVeiw=document.querySelector("#register-veiw");
	var homeVeiw=document.querySelector("#home-veiw");
	var loginVeiw=document.querySelector("#login-veiw");
	regVeiw.style.display="block";
	homeVeiw.style.display="none";
	loginVeiw.style.display="none";
	// currentUser={};
	localStorage.removeItem("currentUser");
}
