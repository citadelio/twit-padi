(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();



 $('.button-collapse').sideNav({
      menuWidth: 175, // Default is 300
      edge: 'right', // Choose the horizontal origin
      draggable: true, // Choose whether you can drag to open on touch screens,
    }
  );


 $('#padiForm').submit(function(e){
 	var input = $('#icon_prefix').val();
 	if(input == ''){
 		e.preventDefault();
 		  Materialize.toast('You haven\'t entered a twitter handle', 4000)
 	}else{
 		setTimeout(function(){
 			$('.loader-center').css('display', 'block');
 		}, 100)
 		
 	}
 })
  }); // end of document ready
})(jQuery); // end of jQuery name space