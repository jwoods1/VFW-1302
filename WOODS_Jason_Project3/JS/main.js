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
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
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
		editlink.addEventListener("click", editItem);
		editlink.innerHTML = editText;
		linkLi.appendChild(editlink);

		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key; // CHECK CAPITAL
		var deleteText = "Delete Client";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linkLi.appendChild(deleteLink);

	}
	function editItem(){
		//grab the data from our item from local storage.
		var itValue = localStorage.getItem(this.key);
		var items = JSON.parse(itValue);

		toggleControls("off");

		//pop form
		$("theCompany").value = items.company[1];
		$("Name").value = items.fname[1];
		$("Lname").value = items.lname[1];
		$("email").value = items.email[1];
		if(items.Auto[1] == "yes"){
			$("auto").setAttribute("checked", "checked");
		}
		if(items.Moto[1] == "yes"){
			$("motorcycle").setAttribute("checked", "checked");
		}
		if(items.rv[1] == "yes"){
			$("rv").setAttribute("checked", "checked");
		}
		if(items.home[1] == "yes"){
			$("home").setAttribute("checked", "checked");
		}
		if(items.rent[1] == "yes"){
			$("rent").setAttribute("checked", "checked");
		}
		if(items.life[1] == "yes"){
			$("life").setAttribute("checked", "checked");
		}
		$("AutoNum").value = items.numV[1];
		$("Pnum").value = items.numPoliy[1];
		$("Comments").value = items.comment[1];
		$("renew").value = items.nDate[1];

		//remove the listener from save contact button
		saveData.removeEventListener("click", storeData);
		//change saveData button
		$("myButton").value = "Edit Client";
		var editClient = $("myButton");
		//save the key value established in the funcion as a propert of the editclient event
		editClient.key = this.key;
		editClient.addEventListener("click", validate);
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
		//define the elemtes we want to check
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
		//email validtaion
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please eneter a valid email address."
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
	function storeData(key){
		if(key == ""){
			var id = Math.floor(Math.random()*100000001);
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
			item.comment	= ["Additoional Comments:", $("Comments").value];
			item.nDate		= ["Renewal Date:", $("renew").value];

		localStorage.setItem(id, JSON.stringify(item));
		alert("Contact Saved");

	}

	//variables

	var companies = ["--Select Company--", "American Mod", "Farmers", "State Farm", "Progressive","All State", "Nation Wide"];
	makeComps(), errM = $("error");
	//set link
	var displayDataLink = $("DisplayData");
	displayDataLink.addEventListener("click", getLocal);
	var clearDataLink = $("clear");
	clearDataLink.addEventListener("click", clearLocal);
	var saveData = $("myButton");
	saveData.addEventListener("click", validate);
});