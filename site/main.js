const container = document.getElementById('container')
let currentLength = 0

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/jokes');
xhr.send();
xhr.responseType = "json"
xhr.onload = () => { 
    const jokes = xhr.response
    if(jokes.length){
     container.innerHTML = ''
     jokes.forEach(element => {
        container.innerHTML+=getJokeHTML(element)
     });
     currentLength = jokes.length
    }
}

function getJokeHTML(joke) {
    return `
    <div class="joke_block" id="Joke_${joke.id}">
                <p class="text">${joke.content}</p>
                <div class="rate">
                <div class = "rateValue"> ${joke.likes}</div>
                    <button class="likeText" onClick = "Like(${joke.id})">  👍</button>

                    <button class="dislikeText" onClick = "Dislike(${joke.id})">  ${joke.dislikes} 👎</button>
                </div>
            </div>
    `
  }

  function Like(id){
    const likeXHR = new XMLHttpRequest()
    likeXHR.open('GET', 'http://localhost:3000/like?id ='+id)
    likeXHR.send()
    likeXHR.responseType = "json"
    likeXHR.onload = () =>{
        const joke = likeXHR.response
        document.getElementById("Joke_" +id).outerHTML = getJokeHTML(joke)
    }
    console.log(id)
}

function Dislike(id){
    const likeXHR = new XMLHttpRequest()
    likeXHR.open('GET', 'http://localhost:3000/dislike?id ='+id)
    likeXHR.send()
    likeXHR.responseType = "json"
    likeXHR.onload = () =>{
        const joke = likeXHR.response
        document.getElementById("Joke_" +id).outerHTML = getJokeHTML(joke)
    }
    console.log(id)
}

   


