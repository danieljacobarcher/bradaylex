/*  DISPLAY MEMBERS GIRLS */

$(document).ready(function(){

	$('.members').css('display','none');
	$('#members-girls').css('display','block');

	$("#button_team_girls").click(function(){
		$(".button_team").removeClass("active_team");
		$(this).addClass("active_team");
		$('.members').css('display','none');
		$('#members-girls').css('display','block');
	});
	/* ADD A TAB HERE */



	
});