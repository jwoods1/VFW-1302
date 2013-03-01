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
	}

	

	function getAutoV(){
		if($("auto").checked){
			autoValue = $("auto").value;
		}else{
			autoValue = "No"
		}
	}

	function getMotoV(){
		if($("motorcycle").checked){
			motoValue = $("motorcycle").value;
		}else{
			motoValue = "No"
		}
	}

	function getRvV(){
		if($("rv").checked){
			rvValue = $("rv").value;
		}else{
			rvValue = "No"
		}
	}

	function getHomeV(){
		if($("home").checked){
			homeValue = $("home").value;
		}else{
			homeValue = "No"
		}
	}

	function getRentV(){
		if($("rent").checked){
			rentValue = $("rent").value;
		}else{
			rentValue = "No"
		}
	}

	function getLifeV(){
		if($("life").checked){
			lifeValue = $("life").value;
		}else{
			lifeValue = "No"
		}
	}
	
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
				$("myButton").style.display = "inline";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}

	function storeData(key){
		if(!key){
			var id 			= Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
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
			item.comment	= ["Additional Comments:", $("Comments").value];
			item.nDate		= ["Renewal Date:", $("renew").value];

		localStorage.setItem(id, JSON.stringify(item));
		alert("Contact Saved");

	}
//Get local Storage function

	function getLocal(){
		toggleControls("on")
		if(localStorage.length === 0){
			alert("there is no data in Local Storage so JSON data was loaded.");
			defaultData();
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
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//convert the string from local storage value back to an Object by using JSON.parse()
			var lObj = JSON.parse(value);
			var createSubList = document.createElement("ul");
			makeli.appendChild(createSubList);
			getClientImg(lObj.company[1], createSubList);
			for(var n in lObj){
				var createSubli = document.createElement("li");
				createSubList.appendChild(createSubli);
				var optSubText = lObj[n][0]+" "+lObj[n][1];
				createSubli.innerHTML = optSubText;
				createSubList.appendChild(linkLi);
			}
			makeItemLink(key, linkLi);//create our edit and delete buttons. for each item in local storage.
		}

	}
	// get Client Company image
	function getClientImg(companyImg,createSubList){
		var imgLi = document.createElement("li");
		createSubList.appendChild(imgLi);
		var newImage = document.createElement("img");
		var sSrc = newImage.setAttribute("src", "img/"+ companyImg + ".gif");
		imgLi.appendChild(newImage);
	}

	function defaultData(){
		// Json.js file required to work
		for(var i in jsonD){
			 var id = Math.floor(Math.random()*100000001);
			 localStorage.setItem(id, JSON.stringify(jsonD[i]));
		}
	}
	
	//create the edit and delete links for each stored item
	function makeItemLink(key, linkLi){
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;// Check CAPITAL
		var editText = "Edit Client";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linkLi.appendChild(editLink);

		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key; // CHECK CAPITAL
		var deleteText = "Delete Client";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linkLi.appendChild(deleteLink);

	}
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this client?");
		if(ask){
			localStorage.removeItem(this.key);
			window.location.reload();
		}else{
			alert("Contact was Not Deleted.");
		}
	}
	function editItem(){
		toggleControls("off");
		//grab the data from our item from local storage.
		var itValue = localStorage.getItem(this.key);
		var item = JSON.parse(itValue);
		//pop form
		$("theCompany").value 	= item.company[1];
		$("Name").value 		= item.fname[1];
		$("Lname").value 		= item.lname[1];
		$("email").value 		= item.email[1];
		if(item.Auto[1] == "yes"){
			$("auto").setAttribute("checked", "checked");
		}
		if(item.Moto[1] == "yes"){
			$("motorcycle").setAttribute("checked", "checked");
		}
		if(item.rv[1] == "yes"){
			$("rv").setAttribute("checked", "checked");
		}
		if(item.home[1] == "yes"){
			$("home").setAttribute("checked", "checked");
		}
		if(item.rent[1] == "yes"){
			$("rent").setAttribute("checked", "checked");
		}
		if(item.life[1] == "yes"){
			$("life").setAttribute("checked", "checked");
		}
		$("AutoNum").value 		= item.numV[1];
		$("Pnum").value 		= item.numPoliy[1];
		$("Comments").value 	= item.comment[1];
		$("renew").value 		= item.nDate[1];

		//remove the listener from save contact button
		saveData.removeEventListener("click", storeData);
		//change saveData button
		$("myButton").value = "Edit Client";
		var editClient = $("myButton");
		//save the key value established in the function as a property of the edit client event
		editClient.addEventListener("click", validate);
		editClient.key = this.key;
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
	function validate(e){
		//define the elements we want to check
		var getCompany = $("theCompany");
		var getFname = $("Name");
		var getLname = $("Lname");
		var getEmail = $("email");
		var getPnum = $("Pnum");
		var getRnew = $("renew");

		//rest Error
		errM.innerHTML = "";
		getFname.style.border = "1px solid black";
		getLname.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";
		getCompany.style.border = "1px solid black";
		getPnum.style.border = "1px solid black";
		getRnew.style.border = "1px solid black";
		// get Error messages
		var messageA =[];
		
		//first name validation
		if(getFname.value == ""){
			var fNameError = "Please enter a first name.";
			getFname.style.border = "1px solid red";
			messageA.push(fNameError);
		}
		//last name validation
		if(getLname.value == ""){
			var LNameError = "Please enter a last name.";
			getLname.style.border = "1px solid red";
			messageA.push(LNameError);
		}	
		//email validation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address."
			getEmail.style.border = "1px solid red";
			messageA.push(emailError);
		}
		//company validation
		if(getCompany.value == "--Select Company--"){
			var companyError = "Please select a company";
			getCompany.style.border = "1px solid red";
			messageA.push(companyError);
		}
		if(getPnum.value == ""){
			var pNumError = "Please input a policy number";
			getPnum.style.border = "1px solid red";
			messageA.push(pNumError);
		}
		if(getRnew.value == ""){
			var reNewError = "Please select valid renewal date.";
			getRnew.style.border = "1px solid red";
			messageA.push(reNewError);
		}

		//if there were errors. display
		if(messageA.length>= 1){
			for(var i=0, j=messageA.length; i < j; i++){
				var txt = document.createElement("li");
				txt.innerHTML = messageA[i];
				errM.appendChild(txt);
			}
			e.preventDefault();
			return false;	
		}else{
			//if valid save
			storeData(this.key);
		}
			
	}

	function addNewClient(){
		var add = confirm("Do you want to ADD a new Client?");
		if(add){
			window.location.reload("additem.html");

		}
		
	}
	//variables

	var companies = ["--Select Company--", "American", "Farmers", "State Farm", "Progressive","All State", "Nation Wide"];
	makeComps(), errM = $("error");
	//set link
	var displayDataLink = $("DisplayData");
	displayDataLink.addEventListener("click", getLocal);
	var clearDataLink = $("clear");
	clearDataLink.addEventListener("click", clearLocal);
	var addClientLink = $("add");
	addClientLink.addEventListener("click", addNewClient);
	var saveData = $("myButton");
	saveData.addEventListener("click", validate);
});