
/* JavaScript content from js/main.js in folder common */
function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
	
}

$( "#home" ).on("pageshow", function( event, ui ) {
	$("#movies").listview('refresh');
});




var search = [];
var movieT = '';
$('#searchMovies').on('click',function(e) {
    e.preventDefault();
    console.log('in here');
    
    var title = $("#movie_name").val();
    var add = '';
    $.ajax({
        async: true,
        cache: false,
        method: 'POST',
        url: 'http://www.omdbapi.com/?',
        data: {
            s: title,
            type: 'movie'
        },
        dataType: 'jsonp',

        success: function(data) {
        	search = data.Search;           
        },
        complete: function() {
        	console.log('in here');	
        	 for(var i=0;i<search.length;i++){
             	
             	add += '<li data-icon="arrow-r" onclick="movieDetails('+ "'"+search[i].Title + "'" + ');"><a href="#"><h3>' + search[i].Title + '</h3><p>' + search[i].Year + '</p></a></li>';
             }
             console.log(add);
             $('#movies').html(''); 
        	 $('#movies').html(add); 
             $("#movies").trigger('create');
        	 $('#movies').listview('refresh');
        }
    });

});


function movieDetails(x){
	console.log(x);
	//title = 'fast';
	//alert('in here');
	var movie = {};
	var tableData = '';
	console.log("in movie details");
	 $.ajax({
	        async: true,
	        cache: false,
	        method: 'POST',
	        url: 'http://www.omdbapi.com/?',
	        data: {
	        	t:x,
	        	
	        },
	        dataType: 'jsonp',

	        success: function(data) {
	        	movie = data;           
	        },
	        complete: function() {
	        	//console.log('in here' + movie.title);
	        	
	        	
	        	tableData+='<table id="moviedetails"  data-mode="reflow" class="ui-responsive table-stroke">';
	        	tableData += '<tr><th>Title</th><td style="padding-left:20px;">' + movie.Title + '</td></tr>'; 
	        	tableData += '<tr><th>Year</th><td style="padding-left:20px;">' + movie.Year + '</td></tr>'; 
	        	tableData += '<tr><th>Plot</th><td style="padding-left:20px;">' + movie.Plot + '</td></tr></table>'; 
	        	$('#here').html('');
	        	$('#here').html(tableData);
	        	 $("#here").trigger('create');
	        	 
	             $.mobile.changePage($("#movieD"),{
								transition : "slide"
							});
	             
	            
	
	        }
	    });
	
}


function backHome(){
	
	$("#movie_name").val('');
	  $('#movies').html(''); 
	
	 $.mobile.changePage($("#home"),{
			transition : "slide"
		});
	
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}