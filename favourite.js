var favouriteContainer =document.getElementById('favouriteContainer');
var PRIV_KEY="a1ac3c62cb38174d0d0b4bde4af00d8b79688ed1";
var PIBLIC_KEY ="93bdc3993f8dd3969ee66f927e737868";
//Onclick event on home btn
var home = document.getElementById('home');
home.addEventListener('click',function(){

    window.location.assign('/index.html');

});
//Onclick event on logo
var pageTitle = document.getElementsByClassName("logo-style")[0];
pageTitle.addEventListener('click',function(){

    window.location.assign('/index.html');

});

var itemLength = localStorage.length;

console.log(itemLength);
//fetching the api request

for(let i =0; i<itemLength;i++)
{
    var element = JSON.parse(localStorage.getItem(localStorage.key(i)));
    datakey = element.id;

    checkValidation = typeof(datakey);
    
    if(checkValidation!=="undefined")
    {
        var ts = new Date().getTime();
        var hash =CryptoJS.MD5(ts+PRIV_KEY+PIBLIC_KEY).toString();
        $.ajax({
            url : `https://gateway.marvel.com/v1/public/characters/${datakey}?apikey=${PIBLIC_KEY}&hash=${hash}&ts=${ts}`,
            method:'GET',
            success:function(data)
            {
                //on success request calling the function to show the result
                console.log(data.data.results[0].id);
                addToFavourite(data);
            }
        });   
    }   
}

//function for add the item into favourite page
function addToFavourite(data)
{

    var element =data.data.results[0];
    var resultDiv = document.createElement('div');
    var imgDiv = document.createElement('div');
    var infoDiv = document.createElement('div');
    var favBtn1 = document.createElement('div');
    var btnDiv = document.createElement('div');
    var dtlBtn = document.createElement('div');
    var nameDiv =  document.createElement('div');


    resultDiv.classList.add('resultDiv');
    imgDiv.classList.add('imgDiv');
    btnDiv.classList.add("btnDiv");
    nameDiv.classList.add("nameDiv");

    imgDiv.innerHTML ='<img src = "'+element.thumbnail.path+'/standard_fantastic.'+element.thumbnail.extension+'">';
    nameDiv.innerHTML ='<h1>'+element.name+'</h1>';
    favBtn1.innerHTML = '<h2>Remove<i class="fa-solid fa-heart-crack"></i></h2>';
    dtlBtn.innerHTML = '<h2>Details<i class="fa-solid fa-circle-info"></i></h2>';

    btnDiv.append(favBtn1);
    btnDiv.appendChild(dtlBtn);
    resultDiv.appendChild(imgDiv);
    resultDiv.appendChild(nameDiv);
    resultDiv.appendChild(btnDiv)
    favouriteContainer.appendChild(resultDiv);

    
//on click event to visit the detail page
    dtlBtn.addEventListener('click',function(){  
        localStorage.setItem('charId', element.id);
         
        window.location.href=('/superhero.github.io/detail.html');
    });

    var search = element.id;

    //Onclick ebent for deleting the item
    favBtn1.addEventListener('click',function (data){
        
        
        //console.log(element.id);
        for(let d=0;d<localStorage.length;d++)
        {
            var item = JSON.parse(localStorage.getItem(localStorage.key(d)));
            if(typeof(item)==="undefined")
            {
                localStorage.removeItem(localStorage.key(d));
                continue;
            }
            else
            {
                if(item.id===element.id)
                {
                    resultDiv.innerHTML = null;
                    localStorage.removeItem(localStorage.key(d));
                    window.location.assign('./favourite.html');
                }
            }

        }
        
        
        
       
        

    });
}