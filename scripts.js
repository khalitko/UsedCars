  console.log("Integrated script loaded");

const carsData = [
    { make: "Toyota", model: "Camry", year: 2019, mileage: 30000, price: 20000, image: "placeholder.jpg" },
    { make: "Toyota", model: "Corolla", year: 2020, mileage: 25000, price: 18000, image: "placeholder.jpg" },
    { make: "Honda", model: "Civic", year: 2020, mileage: 20000, price: 19000, image: "placeholder.jpg" },
    { make: "Honda", model: "Accord", year: 2018, mileage: 40000, price: 17000, image: "placeholder.jpg" },
    { make: "Ford", model: "Mustang", year: 2019, mileage: 15000, price: 25000, image: "placeholder.jpg" },
    { make: "Ford", model: "Focus", year: 2017, mileage: 45000, price: 14000, image: "placeholder.jpg" },
    { make: "Chevrolet", model: "Impala", year: 2019, mileage: 20000, price: 22000, image: "placeholder.jpg" },
    { make: "Chevrolet", model: "Cruze", year: 2018, mileage: 35000, price: 16000, image: "placeholder.jpg" },
    { make: "Nissan", model: "Altima", year: 2020, mileage: 10000, price: 21000, image: "placeholder.jpg" },
    { make: "Nissan", model: "Rogue", year: 2019, mileage: 30000, price: 23000, image: "placeholder.jpg" },
    { make: "BMW", model: "X5", year: 2020, mileage: 10000, price: 50000, image: "placeholder.jpg" },
    { make: "BMW", model: "3 Series", year: 2019, mileage: 20000, price: 45000, image: "placeholder.jpg" },
    { make: "Audi", model: "A4", year: 2021, mileage: 5000, price: 40000, image: "placeholder.jpg" },
    { make: "Audi", model: "Q7", year: 2020, mileage: 15000, price: 55000, image: "placeholder.jpg" },
    { make: "Mercedes-Benz", model: "C-Class", year: 2020, mileage: 12000, price: 46000, image: "placeholder.jpg" },
    { make: "Mercedes-Benz", model: "E-Class", year: 2021, mileage: 7000, price: 55000, image: "placeholder.jpg" },
    { make: "Tesla", model: "Model 3", year: 2021, mileage: 8000, price: 48000, image: "placeholder.jpg" },
    { make: "Tesla", model: "Model S", year: 2019, mileage: 25000, price: 60000, image: "placeholder.jpg" },
    { make: "Hyundai", model: "Elantra", year: 2019, mileage: 30000, price: 18000, image: "placeholder.jpg" },
    { make: "Hyundai", model: "Santa Fe", year: 2020, mileage: 20000, price: 24000, image: "placeholder.jpg" },
    { make: "Toyota", model: "Camry", year: 2019, mileage: 30000, price: 20000, image: "placeholder.jpg" },
    { make: "Toyota", model: "Corolla", year: 2020, mileage: 25000, price: 18000, image: "placeholder.jpg" },
    { make: "Honda", model: "Civic", year: 2020, mileage: 20000, price: 19000, image: "placeholder.jpg" },
    { make: "Honda", model: "Accord", year: 2018, mileage: 40000, price: 17000, image: "placeholder.jpg" },
];

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded triggered for integrated functionality");
    populateMakeDropdown();
    populateYearDropdown();
    document.getElementById('make').addEventListener('change', function() {
        populateModelDropdown();
        populateYearDropdown();
    });
    document.getElementById('model').addEventListener('change', populateYearDropdown);
    document.getElementById('search-btn').addEventListener('click', filterCars);
});

function populateMakeDropdown() {
    const makeDropdown = document.getElementById('make');
    const makes = [...new Set(carsData.map(car => car.make))];

    makes.forEach(make => {
        const option = document.createElement('option');
        option.value = make;
        option.textContent = make;
        makeDropdown.appendChild(option);
    });
}

function populateModelDropdown() {
    const make = document.getElementById('make').value;
    const modelDropdown = document.getElementById('model');

    // Clear existing options
    while (modelDropdown.firstChild) {
        modelDropdown.removeChild(modelDropdown.firstChild);
    }

    const allOption = document.createElement('option');
    allOption.value = "";
    allOption.textContent = "All";
    modelDropdown.appendChild(allOption);

    if (make) {
        const models = [...new Set(carsData.filter(car => car.make === make).map(car => car.model))];

        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelDropdown.appendChild(option);
        });
    }
}

function populateYearDropdown() {
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const yearDropdown = document.getElementById('year');

    // Clear existing options
    while (yearDropdown.firstChild) {
        yearDropdown.removeChild(yearDropdown.firstChild);
    }

    const allOption = document.createElement('option');
    allOption.value = "";
    allOption.textContent = "All";
    yearDropdown.appendChild(allOption);

    let filteredCars = carsData;

    if (make) {
        filteredCars = filteredCars.filter(car => car.make === make);
    }

    if (model) {
        filteredCars = filteredCars.filter(car => car.model === model);
    }

    const years = [...new Set(filteredCars.map(car => car.year))].sort((a, b) => b - a); // Newest first

    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearDropdown.appendChild(option);
    });
}

function filterCars() {
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;
    const minMileage = document.getElementById('min-mileage').value;
    const maxMileage = document.getElementById('max-mileage').value;

    const filteredCars = carsData.filter(car => {
        return (!make || car.make === make) &&
               (!model || car.model === model) &&
               (!year || car.year == year) &&
               (!minPrice || car.price >= minPrice) &&
               (!maxPrice || car.price <= maxPrice) &&
               (!minMileage || car.mileage >= minMileage) &&
               (!maxMileage || car.mileage <= maxMileage);
    });

    displayCars(filteredCars);
}

function displayCars(cars) {
    const resultsSection = document.querySelector('.results-section');
    resultsSection.innerHTML = ''; // Clear existing listings

    cars.forEach(car => {
        const listing = document.createElement('div');
        listing.className = 'listing';

        const details = document.createElement('div');
        details.className = 'listing-details';

        const makeModel = document.createElement('p');
        makeModel.textContent = `${car.make} ${car.model}`;

        const yearMileagePrice = document.createElement('p');
        yearMileagePrice.textContent = `${car.year} | ${car.mileage} miles | $${car.price}`;

        details.appendChild(makeModel);
        details.appendChild(yearMileagePrice);
        listing.appendChild(details);
        resultsSection.appendChild(listing);
    });
}