let enter = document.querySelector('#enterField');
enter.addEventListener('keyup', function(event) {

  if (event.key === "Enter") {
    event.preventDefault();
    fetchData();
  }
});

// //Now Playing
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTdjYzc0OTU1MTQ5YmUyM2RmODM4MTNmMjAxYTRlOCIsInN1YiI6IjYyODM5OGJiZWM0NTUyMTAzMmE5NTcxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.REF4Oi-K06F7Jq8LolG5vPQtyeiGk3nBFdDyL1FLq7E'
//   }
// };

fetch('https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1', options)

// search films
function  fetchData() {
  const infosContainer = document.querySelector('#infos');
  infosContainer.innerHTML = "";
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTdjYzc0OTU1MTQ5YmUyM2RmODM4MTNmMjAxYTRlOCIsInN1YiI6IjYyODM5OGJiZWM0NTUyMTAzMmE5NTcxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.REF4Oi-K06F7Jq8LolG5vPQtyeiGk3nBFdDyL1FLq7E'
    }
  };
  
  let movieSearch = document.querySelector('#enterField').value;

  fetch(`https://api.themoviedb.org/3/search/movie?query=${movieSearch}&include_adult=true&language=fr-FR&page=1`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let index = 0
    for (const movie of data.results) {
      // Convertir la date de sortie au format souhaité
      const releaseDate = new Date(movie.release_date);
      const formattedDate = releaseDate.toLocaleString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      // Créer un lien avec l'ID du film dans l'URL
      const link = document.createElement('a');
      link.href = `movie.html?index=${index}`;
      link.style.textDecoration = 'none';

      // Créer la structure de la carte de film
      const cardHTML = `
      <div class="divCards" style="height:20rem;width=50%" ;>
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="Image de ${movie.title}">
            <div class="overlay-text">
            <p class="Ptitle img__description">${movie.title}</p>
            <p class="releaseD img__description"><i> ${movie.release_date}</i></p>
            <p class="voteA img__description">${movie.vote_average *10}</p> 
            <a href="movie.html?id=${movie.id}" class="BtnV img__description">Voir le film</a>
           </div>
            </div>
        `
      ;

      // Assigner la structure HTML au lien
      link.innerHTML = cardHTML;

      // Ajouter le lien au conteneur
      infosContainer.appendChild(link);
      index++
    }
  });
}