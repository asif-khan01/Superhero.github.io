//Storing data from localstoeage
var charId = localStorage.getItem('charId');

//Marvel keys
var PRIV_KEY="a1ac3c62cb38174d0d0b4bde4af00d8b79688ed1";
var PIBLIC_KEY ="93bdc3993f8dd3969ee66f927e737868";

var detailContainer = document.getElementById('detailContainer');
var pageTitle = document.getElementsByClassName("logo-style")[0];

//On click event on logo
pageTitle.addEventListener('click',function(){

    window.location.href=('/superhero.github.io/index.html');

});
//on click event on home btn
var home = document.getElementById('home');
home.addEventListener('click',function(){

    window.location.assign('/index.html');

});
//on click event on favourite btn
var favrt = document.getElementById('favourite');
home.addEventListener('click',function(){

    window.location.assign('/favourite.html');

});

//fetching requeted API results
getApiResult();
function getApiResult()
{
    var ts = new Date().getTime();
    var hash =CryptoJS.MD5(ts+PRIV_KEY+PIBLIC_KEY).toString();
    $.ajax({
        url : `https://gateway.marvel.com/v1/public/characters/${charId}?apikey=${PIBLIC_KEY}&hash=${hash}&ts=${ts}`,
        method:'GET',
        success:function(data)
        {
            showDetail(data) ;
        }
    });
}
//Displaying the result
function showDetail(data)
{

    var comicName = data.data.results[0].comics;
    var parentDiv = document.createElement('div');
    var element = data.data.results[0];
    var imgDivDtl = document.createElement('div');
    var detailDiv = document.createElement('div');
    var img    =   $(document.createElement('img'));
    var appearnce = document.createElement('div');
    detailDiv.classList.add('detailDiv');
    parentDiv.classList.add('parentDiv');
    img.attr('src',element.thumbnail.path+'/portrait_incredible.'+element.thumbnail.extension);
    imgDivDtl.classList.add('imgDivDtl');

    var nameDetails ='<h1 id="heroName">'+element.name+'</h1>';
    var descDetails ="";
    
    console.log(element.description.length);
    if(element.description.length <2)  
    {
        descDetails='<h2  id="desc" style ="font-size:2rem; justify-content: center; align-items: center;">Sorry, Description is not Available !!&nbsp<i class="fa-solid fa-face-sad-tear"></i></h2>';
    }
    else
    {
        descDetails='<div class="descClass"><h2 >Description:-&nbsp</h2><h3 style=" margin-left: 10px">'+element.description+'</h3></div>';  
      }
    
    
    
    appearnce.innerHTML += '<h2 id="toatlComic">Total Comics:&nbsp&nbsp<p style="display:inline">'+element.comics.available+'</p></h2>';
    appearnce.innerHTML += '<h2 id="toatlComic">Stories Available:&nbsp&nbsp<p style="display:inline">'+element.series.available+'</p></h2>';
    
    appearnce.classList.add('appearnce');
    detailDiv.innerHTML +=nameDetails;
    detailDiv.innerHTML += descDetails;
    detailDiv.appendChild(appearnce)

    img.appendTo(imgDivDtl);
    parentDiv.appendChild(imgDivDtl)
    parentDiv.appendChild(detailDiv)
    detailContainer.appendChild(parentDiv);

}
