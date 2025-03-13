fetch('http://localhost:3000/series')  
    .then(response => response.json())
    .then(data => {
        console.log('Fetched Series:', data);
        displaySeries(data);
    })
    .catch(error => console.error('Error fetching series:', error));

function displaySeries(seriesList) {
    const seriesContainer = document.getElementById("series-list");

    seriesList.forEach(series => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${series.title}</strong> (${series.release_year}) - ${series.seasons} seasons <br> Genre: ${series.genre.join(", ")}`;
        seriesContainer.appendChild(li);
    });
}
