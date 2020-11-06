// var movies=[
// 	{'key':makeKey(),'movie':"Interstellar", 'genre':"Sci-fi", 'lang': "English", 'date': new Date(2000,1,24), 'rating': 5},
// 	{'key':makeKey(),'movie':"FF8", 'genre':"Action", 'lang': "English", 'date': new Date(8,5,11), 'rating': 4.5},
// 	{'key':makeKey(),'movie':"Jumanji", 'genre':"fiction", 'lang': "English", 'date': new Date(99,5,28), 'rating': 3.5},
// 	{'key':makeKey(),'movie':"Alpha", 'genre':"fiction", 'lang': "English", 'date': new Date(98,8,23), 'rating': 2.8},
// 	{'key':makeKey(),'movie':"Inception", 'genre':"fiction", 'lang': "English", 'date': new Date(56,10,18), 'rating': 4.6},
// 	{'key':makeKey(),'movie':"Pulp-Fiction", 'genre':"Sci-fi", 'lang': "English", 'date': new Date(), 'rating': 5},
// 	{'key':makeKey(),'movie':"Spiderman", 'genre':"Action", 'lang': "English", 'date': new Date(90,0,1), 'rating': 4.5},
// 	{'key':makeKey(),'movie':"Hulk", 'genre':"fiction", 'lang': "English", 'date': new Date(97,11,22), 'rating': 3.5},
// 	{'key':makeKey(),'movie':"Avengers", 'genre':"fiction", 'lang': "English", 'date': new Date(), 'rating': 2.8},
// 	{'key':makeKey(),'movie':"Avatar", 'genre':"fiction", 'lang': "English", 'date': new Date(78,9,29), 'rating': 4.6},
// ];

var movies;
if(!localStorage.getItem("movies"))
	movies=[];
else
	movies=JSON.parse(localStorage.getItem("movies"));


var imgPath=[
	"./thumbnails/img1.jpg", "./thumbnails/img2.jpg", "./thumbnails/img3.jpg",
	"./thumbnails/img4.jpg", "./thumbnails/img5.jpg", "./thumbnails/img6.jpg",
	"./thumbnails/img7.jpg", "./thumbnails/img8.jpg", "./thumbnails/img9.jpg",
	"./thumbnails/img10.jpg",
];

var movieData=document.querySelector("#movie-data");
movieData.addEventListener('load', generateMveContent(movies));


movieData.addEventListener('click', function(e){
	var tar = e.target;
	var editBtn=tar.classList.contains("edit-rating");
	if(editBtn){
		var rateInp=tar.parentElement.parentElement.querySelector("#edit-inpR");
		// console.log(rateInp);
		rateInp.disabled=false;
		rateInp.focus();
		rateInp.addEventListener('change', function(e){
			if(parseInt(e.target.value) > 5){
				alert('Rate from 1-5 only');
				e.target.focus();
			}
			else if(parseInt(e.target.value) < 1){
				alert('Rate from 1-5 only');
				e.target.focus();
			}
			else if(e.target.value===""){
				alert('Enter Rating');
				e.target.focus();
			}
			else{
				rateInp.addEventListener('blur', function(e){
					var parent=e.target.parentElement.parentElement;
					// console.log(e.target.value,"hiiiiii",parent.id);
					if(parent!=null)
						setRating(parent.id, e.target.value);
					e.target.disabled=true;
					e.stopPropagation();
				});
			}
			e.stopPropagation();
		});
	}
	e.stopPropagation();
});


var insertB = document.querySelector("#addNewMve");
insertB.addEventListener('click', function(e){
	e.preventDefault();
	var obj={};
	var allInp = document.querySelectorAll("#new-mve input");
	var infoEmptyflag=false;
	allInp.forEach((inp)=>{
		if(inp.value!="")
			obj[inp.name]=inp.value;
		else
			infoEmptyflag=true;
		// inp.value="";
	});
	var rate=document.querySelector("#mveRating");
	if(infoEmptyflag)
		alert('Enter all details of the movie.');
	else if(parseInt(obj["rating"]) < 1){
		alert('Rate 1-5 only');
		rate.focus();
	}
	else if(parseInt(obj["rating"]) > 5){
		alert('Rate 1-5 only');
		rate.focus();
	}
	else if(obj["rating"]==""){
		alert('Enter Rating');
		rate.focus();
	}
	else{
		obj["date"]=new Date();
		obj["key"]=makeKey();
		obj["imgSrc"]=Math.floor(Math.random()*10);
		appendMve(obj);
		alert('Movie Added Successfully!!!')
		formReset(allInp);
	}
});


function makeKey(){
	var length=	Math.floor(10+Math.random()*20); 
   	var result= '';
   	var characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   	var charactersLength = characters.length;
   	for ( var i = 0; i < length; i++ ) {
      	result += characters.charAt(Math.floor(Math.random()*charactersLength));
   	}
   	return result;
}


function generateContentStr(mveData){
	var str="";
	if(mveData.length==0)
		str="<h2 class='text-center'>No Movies To Display</h2>"
	else
		mveData.forEach((mve)=>{
				str += `<div class="row mve-row" id=${mve["key"]}>
								<div class="col-3">
									<img src=${imgPath[mve["imgSrc"]]} alt="movie">
								</div>
								<div class="col-5">
									<h5>${mve["movie"]}</h5>
									<small>
										Language : ${mve["lang"]}
										<br> 
										Genre : ${mve["genre"]}
									</small>
									<br>
									<small>Date Added : ${new Date(mve["date"]).toDateString()}</small>
									<br>
									<small>Rating : <b>${mve["rating"]}</b></small>
								</div>
								<div class="col-4">
									<div class="row" id=${mve["key"]}>
										<p>Give Movie Rating( 1 - 5 )</p>
										<div clas="col-8">
								  			<input data-toggle="tooltip" title='${mve["movie"]} movie rating' type="number" step="0.1" max="5" class="form-control form-control-sm" id="edit-inpR" value="${mve["rating"]}" disabled>
								  		</div>
								  		<div class="col-4">
								  			<span data-toggle="tooltip" title='edit rating by clicking here\nclick away to save rating' class="edit-rating text-primary">edit</span>
								  		</div>
								  	</div>
								</div>
							</div>`
			});
	return str;
}


function generateMveContent(mvedata){
	var content = document.querySelector("#movie-data");
	content.innerHTML="";
	var str=generateContentStr(mvedata);
	content.innerHTML=str;
}


function appendMve(obj){
	movies.push(obj);
	localStorage.setItem("movies",JSON.stringify(movies));
	generateMveContent(movies);
}

var cntRating=1;
function setRating(key, rating){
	// console.log(key, rating);
	movies.forEach((mve)=>{
		if(mve["key"]==key){
			mve["rating"]=rating;
		}
	});
	localStorage.setItem("movies",JSON.stringify(movies));
}


