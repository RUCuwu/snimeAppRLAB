function searchAnime(query) {
    const API_URL = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            displayResults(data.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('resultsContainer').innerHTML = '<p>Error fetching data. Please try again later.</p>';
        });
}

function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; 
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(item => {
        const title = item.attributes.titles.en || item.attributes.titles.en_jp || item.attributes.canonicalTitle;
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.textContent = title;
        resultsContainer.appendChild(resultItem);
    });
}

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        searchAnime(query);
    } else {
        alert('Please enter an anime');
    }
});