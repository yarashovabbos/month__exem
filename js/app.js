document.addEventListener('DOMContentLoaded', () => {
    const countriesList = document.getElementById('countries-list');
    const searchInput = document.getElementById('search-input');
    const regionSelect = document.getElementById('region-select');
    const toggleDarkMode = document.getElementById('toggle-dark-mode');
    let countries = [];
    let darkMode = false;

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            countries = await response.json();
            displayCountries(countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const displayCountries = (countries) => {
        countriesList.innerHTML = '';
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.classList.add('country-card');
            countryCard.innerHTML = `
                <img src="${country.flags.png}" alt="${country.name.common}">
                <div class="card-body">
                    <h3>${country.name.common}</h3>
                    <p>Population: ${country.population.toLocaleString()}</p>
                    <p>Region: ${country.region}</p>
                    <p>Capital: ${country.capital}</p>
                </div>
            `;
            countryCard.addEventListener('click', () => {
                localStorage.setItem('selectedCountry', country.cca3);
                window.location.href = `country.html?code=${country.cca3}`;
            });
            countriesList.appendChild(countryCard);
        });
    };

    const filterCountries = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const region = regionSelect.value;
        const filteredCountries = countries.filter(country => {
            const matchesSearch = country.name.common.toLowerCase().includes(searchTerm);
            const matchesRegion = region ? country.region === region : true;
            return matchesSearch && matchesRegion;
        });
        displayCountries(filteredCountries);
    };

    searchInput.addEventListener('input', filterCountries);
    regionSelect.addEventListener('change', filterCountries);

    toggleDarkMode.addEventListener('click', () => {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode', darkMode);
    });

    fetchCountries();
});
