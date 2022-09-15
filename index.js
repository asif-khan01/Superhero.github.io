//Marvel Key for authorisation
var PRIV_KEY="a1ac3c62cb38174d0d0b4bde4af00d8b79688ed1";
var PIBLIC_KEY ="93bdc3993f8dd3969ee66f927e737868";


var searchInput = document.getElementById("search");
//storing input data and 
searchInput.addEventListener('keyup',function(){

    var searchValue= searchInput.value;
    
        clearContainer();
    if(searchValue.length>=3)
    {
        getResult(searchValue);
    }
});

//Calling the API function
function getResult(searchValue)
{
    var ts = new Date().getTime();
    var hash =CryptoJS.MD5(ts+PRIV_KEY+PIBLIC_KEY).toString();
    $.ajax({
        url: `https://gateway.marvel.com/v1/public/characters?ts=${ts}&nameStartsWith=${searchValue}&apikey=${PIBLIC_KEY}&hash=${hash}`,
        method:'GET',
        beforeSend:function()
        {
            loadingFn();
        },
        success:function(data)
        {    
            if(data.data.total===0)
            {
               noResultFound();
            }
            else
            {
                displayResult(data);  
            }   
        }

    });

}

//Fetching the required ID
var noResultContainer = document.getElementById("noResultContainer");
var resultContainer = document.getElementById("resultContainer");

//Displaying the Loading message if data is taking time to load
function loadingFn()
{
    var resultDiv =document.createElement('div');
    var loadingText =document.createElement('div');
    loadingText.innerHTML='<h1>Please Wait !! <br>Loading.....</h1>';
    resultDiv.classList.add('noResultDiv');
    resultDiv.appendChild(loadingText)
    noResultContainer.appendChild(resultDiv);
    
}
//clearing function if the input field is empty
function clearContainer()
{
    noResultContainer.innerHTML = "";
    resultContainer.innerHTML = "";
}

//Displaying Message if no data found
function noResultFound()
{
    noResultContainer.innerHTML = "";
    resultContainer.innerHTML = "";
    var resultDiv       =       document.createElement('div');
    var noResultTextDiv =       document.createElement('div');
    var noResultEmotDiv =       document.createElement('div');

    noResultEmotDiv.innerHTML='<h1><i class="fa-solid fa-ban"></i></h1>';
    noResultTextDiv.innerHTML='<h1>Oops Sorry !! <br> No Result Found.....</h1>';
    
    resultDiv.appendChild(noResultEmotDiv);
    resultDiv.appendChild(noResultTextDiv);
    resultDiv.classList.add('noResultDiv');
    noResultContainer.appendChild(resultDiv);
    console.log("no data found");
}

//Displaying the requested from API
function displayResult(data)
{
    resultContainer.innerHTML = "";
    noResultContainer.innerHTML = "";
 
    for(let i =0;i<data.data.results.length;i++)
        {
            let element      =      data.data.results[i];  
            var resultDiv    =      document.createElement('div');
            var imgDiv       =      document.createElement('div');
            var infoDiv      =      document.createElement('div');
            var textDiv      =      document.createElement('div');
            var textName     =      document.createElement('h1');
            var favBtn       =      document.createElement('h1');
            var dtlBtn       =      document.createElement('h1');
            var btnDiv       =      document.createElement('div');
            textDiv.classList.add('textDiv');
            
            
            var id = element.id;
            imgDiv.classList.add('imgDiv');
            btnDiv.classList.add('btnDiv')
            resultDiv.classList.add('resultDiv');
            infoDiv.classList.add('infoDiv');
            
            textName.innerHTML = element.name;
            imgDiv.innerHTML ='<img src="'+element.thumbnail.path+'/standard_fantastic.'+element.thumbnail.extension+'" alt="">';
            favBtn.innerHTML ='<div id="favBtn" title="Add To Favourite"><h1>Add</h1><h1><i class="fa-regular fa-heart"></i></h1></div';
            dtlBtn.innerHTML ='<div id="dtlBtn" title="Click to know more"><h1>Details</h1><h1><i class="fa-regular fa-file-lines"></i></h1></div';

            textDiv.appendChild(textName);
            btnDiv.appendChild(dtlBtn);
            btnDiv.appendChild(favBtn);
            infoDiv.appendChild(textDiv);
            resultDiv.appendChild(imgDiv);
            resultDiv.appendChild(infoDiv);
            infoDiv.appendChild(btnDiv);
            resultContainer.appendChild(resultDiv)

            //On click event on detail button
            dtlBtn.addEventListener('click',function(){  
                localStorage.setItem('charId', element.id);

              /*  var link=document.createElement("a");
                link.id = 'someLink'; 
                link.href="/superhero.github.io/detail.html";
                document.body.appendChild(link)
                document.getElementById('someLink').click();
                console.log(element.id); */
                window.location.href=('/superhero.github.io/detail.html');
            });

            //On click event on Favourite button
            favBtn.addEventListener('click',function(event){
                // var storageLength = localStorage.length;
                console.log(element);
                // console.log(storageLength);
                let item = localStorage.getItem(element.id);
                if(item && item.length) {
                    alert("hero is already added");
                }else {
                    var dataString = JSON.stringify(element);
                    localStorage.setItem(element.id, dataString);
                    alert("hero is successfuly added to favourite");
                }          
            });


        }
}

