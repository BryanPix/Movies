let searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click', fetchData);

function  fetchData() {
fetch("./movies.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const infosContainer = document.querySelector('#infos');
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
      <div class="divCards">
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="Image de ${movie.title}">
            <p class="Ptitle">${movie.title}</p>
            <p class="releaseD"><i> ${movie.release_date}</i></p>
            <p class="voteA">${movie.vote_average *10}</p> 
            // <a href="movie.html" class="BtnV">Voir Plus</a>
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