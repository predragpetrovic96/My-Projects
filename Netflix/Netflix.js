$( document ).ready(function() {  
    console.log( "ready!" );

    $('.tab').on('click',function(){
    	$('.tab.active').removeClass('active');
    	$(this).addClass('active');

    	var tabId = $(this).attr('data-tabId');
    	tabId = '#'+tabId;

    	$('.tab_content').removeClass('active');
    	$(tabId).addClass('active');
    });

});
