$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: "http://localhost:3000/users",
	})
	.done(function(data){
		console.log( "REST api /users returned: " + JSON.stringify(data));
	});
});