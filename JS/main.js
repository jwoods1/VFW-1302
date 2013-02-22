/* 
Woods Jason
VFW 1302
Project 2 
JavaScript
*/
// wait until the dom is ready
window.addEventListener("DOMContentLoaded", function(){

	function $(x){
		var theId = document.getElementById(x);
		return theId;
	}

	//create select 
	function makeComps(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('selectCompany'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "theCompany");
		for(var i=0, j=companies.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = companies[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);

		}
		selectLi.appendChild(makeSelect);
	};

	function getAutoV(){
		if($("auto").checked){
			autoValue = $("auto").value;
		}else{
			autoValue = "No"
		}
	};

	function getMotoV(){
		if($("motorcycle").checked){
			motoValue = $("motorcycle").value;
		}else{
			motoValue = "No"
		}
	};

	function getRvV(){
		if($("rv").checked){
			rvValue = $("rv").value;
		}else{
			rvValue = "No"
		}
	};

	function getHomeV(){
		if($("home").checked){
			homeValue = $("home").value;
		}else{
			homeValue = "No"
		}
	};

	function getRentV(){
		if($("rent").checked){
			rentValue = $("rent").value;
		}else{
			rentValue = "No"
		}
	};

	function getLifeV(){
		if($("life").checked){
			lifeValue = $("life").value;
		}else{
			lifeValue = "No"
		}
	};
	function storeData(){
		var id      = Math.floor(Math.random()*100000001);
		getAutoV();
		getMotoV();
		getRvV();
		getHomeV();
		getRentV();
		getLifeV();

		//gather up all our form field values and store them in an object
		// Object properties contain array with the form label and input values.
		var item 			= {};
			item.company	= ["Company:", $("theCompany").value];
			item.fname  	= ["First Name:", $("Name").value];
			item.lname  	= ["Last Name:", $("Lname").value];
			item.email  	= ["Email:", $("email").value];
			item.Auto 		= ["Auto Insurance:", autoValue];
			item.Moto 		= ["motorcycle Insurance:", motoValue];
			item.rv		    = ["RV Insurance:", rvValue];
			item.home		= ["Home Insurance:", homeValue];
			item.rent 		= ["Renters Insurance:", rentValue];
			item.life		= ["Life Insurance:", lifeValue];
			item.numV		= ["Number of Vehicles:", $("AutoNum").value];
			item.numPoliy   = ["Policy Number:", $("Pnum").value];
			item.comment	= ["Additoional Comments:", $("Comments").value];
			item.nDate		= ["Renewal Date:", $("renew").value];

		localStorage.setItem(id, JSON.stringify(item));
		alert("Contact Saved");

	};
	function toggleControls(n){
		switch(n){
			case "on":
				$("NewClient").style.display = "none";
				$("clear").style.display = "inline";
				$("add").style.display = "inline";
				$("DisplayData").style.display = "none";
				$("myButton").style.display = "inline";
				break;
			case "off":
				$("NewClient").style.display = "block";
				$("clear").style.display = "inline";
				$("add").style.display = "none";
				$("DisplayData").style.display = "inline";
				$("myButton").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}

//Get local Storage function

	function getLocal(){
		toggleControls("on")
		if(localStorage.lenght === 0){
			alert("there is no data in Local Storage.");
		};
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++) {
			var makeli = document.createElement("li");
			var linkLi = document.createElement("li");
			linkLi.setAttribute("id","links");
			makeList.appendChild(makeli);
			var Key = localStorage.key(i);
			var value = localStorage.getItem(Key);
			//convert the string from local storage value back to an Object by useing JSON.parse()
			var lObj = JSON.parse(value);
			var createSubList = document.createElement("ul");
			makeli.appendChild(createSubList);
			for(var n in lObj){
				var createSubli = document.createElement("li");
				createSubList.appendChild(createSubli);
				var optSubText = lObj[n][0]+" "+lObj[n][1];
				createSubli.innerHTML = optSubText;
				createSubList.appendChild(linkLi);
			}
			makeItemLink(localStorage.key(i), linkLi);//create our edit and delete buttons. for each item in local storage.
		}

	}
	//create the edit and delete links for each stored item
	function makeItemLink(key, linkLi){
		var editlink = document.createElement("a");
		editlink.href = "#";
		editlink.key = key;// Check CAPITAL
		var editText = "Edit Client";
		//editlink.addEventListener("click", editItem);
		editlink.innerHTML = editText;
		linkLi.appendChild(editlink);

		var addClient = document.createElement("a");
		addClient.href ="additem.html";
		addClient.key = key;
		var addText = "Add New Client";
		addClient.innerHTML = addText;
		linkLi.appendChild(addClient);


		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key; // CHECK CAPITAL
		var deleteText = "Delete Client";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linkLi.appendChild(deleteLink);

	}


	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
			window.location.reload();

		}else{
			localStorage.clear();
			alert("All Clients are deleted!")
			window.location.reload();
			return false;
		}
	}

	//add new client reload

	function addNc(){
		window.location.reload();
	}

	var companies = ["--Select Company--", "American Mod", "Farmers", "State Farm", "Progressive","All State", "Nation Wide"];
	makeComps();
	//set link
	var displayDataLink = $("DisplayData");
	displayDataLink.addEventListener("click", getLocal);
	var clearDataLink = $("clear");
	clearDataLink.addEventListener("click", clearLocal);
	var addNewClient = $("add");
	addNewClient.addEventListener("click", addNc);
	var saveData = $("myButton");
	saveData.addEventListener("click", storeData);
});