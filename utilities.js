var select = document.querySelector("#sort");
select.addEventListener('change', function(e){
	sortMveData(e.target.value);
});


var keyToFilter;
var keyVal=document.querySelector("#filter-by");
keyVal.addEventListener('click', function(e){
	keyToFilter=e.target.value;
	// console.log(keyToFilter);
	e.target.parentElement.previousElementSibling.innerText = e.target.innerText;
	// console.log(e.target.parentElement.parentElement.nextElementSibling);
	e.target.parentElement.parentElement.nextElementSibling.value="";
});


var search=document.querySelector("#search-val");
search.addEventListener('input', function(e){
	// console.log(e.target.value,keyToFilter);
	filterMveData(keyToFilter, e.target.value);
});


function sortMveData(item){
	// console.log(item);
	var temp=movies;
	if(item!="default"){
		if(item=="date" || item=="rating"){
			temp.sort((a,b)=>{
				// var tdate=new Date();
				if(a[item] < b[item])
					return 1;
				if(a[item] > b[item])
					return -1;
				return 0;
			});
		}
		else{	
			temp.sort((a,b)=>{
				if(a[item].toUpperCase() > b[item].toUpperCase())
					return 1;
				if(a[item].toUpperCase() < b[item].toUpperCase())
					return -1;
				return 0;
			});
		}
		generateMveContent(temp);
	}
	else{
		generateMveContent(movies);
	}
}


function filterMveData(key, item){
	var addMve=document.querySelector("#add-mve");
	if(!key)
		alert("Select filter by...")
	else{
		if(item){
			item=item.toLowerCase();
			var res=movies;
			var ans=new Array();
			res = res.filter((x)=>{
				if(x[key].toUpperCase().startsWith(item.toUpperCase()))
					ans.push(x);
			});
			// console.log(ans);
			if(currentUser["isAdmin"]===true)
				addMve.style.display="none";
			generateMveContent(ans);
		}
		else{
			if(currentUser["isAdmin"]===true)
				addMve.style.display="block";
			generateMveContent(movies);
		}
	}
}


function formReset(inpArr){
	Array.from(inpArr).forEach((inp)=>{
		inp.value="";
	});
}
