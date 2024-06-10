document.addEventListener('DOMContentLoaded', () => {
    const countryDetails = document.getElementById('country-details');
    const countryCode = new URLSearchParams(window.location.search).get('code');

    const fetchCountry = async (code) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
            const country = await response.json();
            displayCountry(country[0]);
        } catch (error) {
            console.error('Error fetching country:', error);
        }
    };

    const displayCountry = (country) => {
        countryDetails.innerHTML = `
            <div class="country-card">
                <img src="${country.flags.png}" alt="${country.name.common}">
                <div class="card-body">
                    <h3>${country.name.common}</h3>
                    <p>Population: ${country.population.toLocaleString()}</p>
                    <p>Region: ${country.region}</p>
                    <p>Capital: ${country.capital}</p>
                    <p>Subregion: ${country.subregion}</p>
                    <p>Languages: ${Object.values(country.languages).join(', ')}</p>
                </div>
            </div>
        `;
    };

    // toggleDarkMode.addEventListener('click', () => {
    //     darkMode = !darkMode;
    //     document.body.classList.toggle('dark-mode', darkMode);
    // });

    fetchCountry(countryCode);
});


