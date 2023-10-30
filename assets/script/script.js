const urlParams = new URLSearchParams(window.location.search);
        const movieIndex = urlParams.get('id');

        if (movieIndex) {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTdjYzc0OTU1MTQ5YmUyM2RmODM4MTNmMjAxYTRlOCIsInN1YiI6IjYyODM5OGJiZWM0NTUyMTAzMmE5NTcxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.REF4Oi-K06F7Jq8LolG5vPQtyeiGk3nBFdDyL1FLq7E'
                }
            };

            fetch(`https://api.themoviedb.org/3/movie/${movieIndex}?language=fr-FR`, options)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    document.getElementById('movie-title').textContent = data.title
                    document.getElementById('movie-release-date').textContent = `Date de sortie : ${data.release_date}`
                    document.getElementById('movie-overview').textContent = data.overview
                    document.getElementById('movie-poster').src = `https://image.tmdb.org/t/p/original${data.poster_path}`
                })
        }