$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
// sava form function

var getAutoV = function(){
	if($("#auto").checked){
		autoV = $("#auto").val();
	}else{
		autoV = "no"
	}
};
var getMoto = function(){
	if($("#motorcycle").checked){
		moto = $("#motorcycle").val();
	}else{
		moto = "no"
	}
};
var getHome = function(){
	if($("#hOwner").checked){
		hOwner = $("#hOwner").val();
	}else{
		hOwner = "no"
	}
};
var getRv = function(){
	if($("#rv").checked){
		gRv = $("#rv").val();
	}else{
		gRv = "no"
	}
};
var getRent = function(){
	if($("#rent").checked){
		gRent = $("#rent").val();
	}else{
		gRent = "no"
	}
};
var getLife = function(){
	if($("#life").checked){
		gLife = $("#life").val();
	}else{
		gLife = "no"
	}
};
var getHealth = function(){
	if($("#health").checked){
		gHealth = $("#health").val();
	}else{
		gHealth = "no"
	}
};
var saveData = function(data){
	getAutoV();
	getMoto();
	getRv();
	getHome();
	getRent();
	getLife();
	getHealth();


	var id = Math.floor(Math.random()*100000001);
	var item 			= {};
			item.numPoliy   = ["Policy Number:", $("#Pnum").val()];
			item.company	= ["Company:", $("#selectCompany").val()];
			item.fname  	= ["First Name:", $("#fName").val()];
			item.lname  	= ["Last Name:", $("#lName").val()];
			item.email  	= ["Email:", $("#email").val()];
			item.Auto 		= ["Auto Insurance:", autoV];
			item.Moto 		= ["motorcycle Insurance:",moto];
			item.rv		    = ["RV Insurance:", gRv];
			item.home		= ["Home Insurance:", hOwner];
			item.rent 		= ["Renters Insurance:", gRent];
			item.life		= ["Life Insurance:", gLife];
			item.heal		= ["Health Insurance:", gHealth];
			item.comment	= ["Additional Comments:", $("#textarea").val()];
			item.nDate		= ["Renewal Date:", $("#renew").val()];

		localStorage.setItem(id, JSON.stringify(item));
		alert("Contact Saved");

};

$("#addNew").validate({
	invalidHandler: function(form, validator){},
	submitHandler: function(form){
		var data = $("#addNew").serializeArray();
		saveData(data);
 }
});
//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};


var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};

