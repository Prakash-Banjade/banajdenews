console.log("This is news site created by Prakash Banjade")
let date = new Date();

// Setting up the current time
let timeContainer = document.getElementById('currTime');
setInterval(myTimer, 1000);

function myTimer() {
    const dates = new Date();
    document.getElementById("demo").innerHTML = `<b>${dates.toLocaleString()}</b>`;
}

let newsContainer = document.getElementById('newsContainer');
let leftNews = document.getElementById("ln");
let rightNews = document.getElementById('rn');
let categoryNews = document.getElementById('category-news');
let updateTime = document.querySelectorAll('.updateTime');
// let apiKey = '642bf49f4bc44ac58d9e831de81c1a9c';
let apiKey = '053459b5cec8426abdff451837580308';
// let apiKey = 'bff321d664ea4cb3a095bbd2716a33d0';
// Creating past date
let pastDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
// console.log(pastDate);
// `https://newsapi.org/v2/top-headlines?country=in&apiKey=053459b5cec8426abdff451837580308`
// https://newsapi.org/v2/top-headlines?country=${newsCountry}&apiKey=${apiKey}

// ========== Getting Indian News ============
let newsCountry = 'in'

function startingNews() {
    let xhrInd = new XMLHttpRequest();
    xhrInd.open('GET', `https://newsapi.org/v2/top-headlines?country=in&apiKey=053459b5cec8426abdff451837580308`, true);
    xhrInd.onload = function() {
        if (this.status == 200) {
            let json = JSON.parse(this.responseText);
            Array.from(updateTime).forEach((e) => {
                e.innerText = json.articles[0].publishedAt;
            })

            let leftNewsHtml = '';
            let rightNewsHtml = '';
            json.articles.forEach(function(element, index) {
                leftNewsHtml += `<div class="news1" id="${index}">
                <span>${element.title.slice(0, 50)}....</span>
                <img src="${element.urlToImage}">
                <span class="readMore">Read More <a href="${element.url}">Here!</a></span>
                </div>`;
                rightNewsHtml += `<li><a href="#${index}">${element.title}</a></li>`;
            });

            leftNews.innerHTML = leftNewsHtml;
            leftNews.children[0].children[2].style.display = "none";
            rightNews.children[1].innerHTML = rightNewsHtml;
            leftNews.children[0].addEventListener('click', () => {
                location.href = `${json.articles[0].url}`;
            })



        } else {
            newsContainer.innerHTML = `<div style="font-size: 3rem; margin-top: 2rem;">The server is down for some reason!<br><span style="font-size:1.5rem;">Please try again in a while.</span></div>`;
        }
    }

    xhrInd.send();
    Array.from(leftNews.children).forEach((e) => {
        e.children[0].innerText = `${ e.children[0].innerText.slice(0,50)}...`;
    });
}
startingNews();

// changing the category

let category = document.getElementById('category');
category.addEventListener('change', (e) => {
    let apiCat = e.target.value;
    if (apiCat == 'all') {
        allNews();
        return;
    }
    categoryNews.style.display = 'flex';
    let categoryNewsHtml = '';
    rightNews.style.display = "none";
    leftNews.style.display = "none";

    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://newsapi.org/v2/top-headlines/sources?category=${apiCat}&apiKey=${apiKey}`, true);
    xhr.setRequestHeader('X-Api-Key', apiKey);

    xhr.onload = function() {
        if (this.status == 200) {
            let json = JSON.parse(this.responseText);
            json.sources.forEach((element) => {
                categoryNewsHtml += `  <a href="${element.url}">
                    <div class="news">
                        <h1><strong><em>${element.description}</em></strong></h1>
                        <div class="newsName">${element.name}</div>
                    </div>
                </a>`
            })
            categoryNews.innerHTML = categoryNewsHtml;

        } else {
            newsContainer.innerHTML = `<div style="font-size: 3rem; margin-top: 2rem;">Can't parse the news at the moment!<br><span style="font-size:1.5rem;">Please try again in a while.</span></div>`;
        }
    }
    xhr.send();
})

// Clicking on home Button
let homeBtn = document.getElementById('home');
homeBtn.addEventListener('click', allNews);

function allNews() {
    categoryNews.style.display = 'none';
    leftNews.style.display = 'flex';
    rightNews.style.display = 'block';
}

// Changing country
let countryBtn = document.getElementsByClassName('country-category');
let headlineHeader = document.getElementById('headline-header');
let countries = document.getElementById("countries");
Array.from(countryBtn).forEach((element) => {
    element.addEventListener('click', (e) => {
        let countryCode = e.target.innerText == 'India' ? 'in' : 'us';
        if (countryCode == 'us') {
            countries.children[0].classList.remove('active');
            countries.children[1].classList.add('active');
            headlineHeader.innerText = 'Top Headlines - American News';
        } else {
            countries.children[1].classList.remove('active');
            countries.children[0].classList.add('active');
            headlineHeader.innerText = 'Top Headlines - Indian News';
        }
        newsCountry = countryCode;
        startingNews();
    })
})

// ========== Getting Tesla News ============
let teslaNews = document.getElementById('tesla-today');
let xhrTes = new XMLHttpRequest();
xhrTes.open('GET', `https://newsapi.org/v2/everything?q=tesla&from=${pastDate}&sortBy=publishedAt&apiKey=${apiKey}`, true);
xhrTes.onload = function() {
    if (this.status == 200) {
        let json = JSON.parse(this.responseText);
        let teslaTodayHtml = '';
        json.articles.forEach(function(element, index) {
            teslaTodayHtml += `<div class="news1" id="${index}">
            <span>${element.title.slice(0, 50)}....</span>
            <img src="${element.urlToImage}">
            <span class="readMore">Read More <a href="${element.url}">Here!</a></span>
        </div>`;
        });
        teslaNews.innerHTML = `<h2>Tesla Today</h2>${teslaTodayHtml}`;
        teslaNews.children[1].children[2].style.display = 'none';
    } else {
        teslaNews.innerHTML = `<div style="font-size: 3rem; margin-top: 2rem;">Can't show now! 
        Come back in a while.</span></div>`;
    }
};

xhrTes.send();

// ============== Apple News ================
let appleNews = document.getElementById('apple-now');
let xhrApple = new XMLHttpRequest();
// xhrApple.open('GET', `https://newsapi.org/v2/everything?q=apple&from=2022-7-2&to=2022-07-02&sortBy=popularity&apiKey=${apiKey}`, true);
xhrApple.open('GET', `https://newsapi.org/v2/everything?q=apple&from=${pastDate}&sortBy=popularity&apiKey=${apiKey}`, true);
xhrApple.onload = function() {
    if (this.status == 200) {
        let json = JSON.parse(this.responseText);
        let appleNowHtml = '';
        json.articles.forEach(function(element, index) {
            appleNowHtml += `<div class="news1" id="${index}">
            <span>${element.title.slice(0, 50)}....</span>
            <img src="${element.urlToImage}">
            <span class="readMore">Read More <a href="${element.url}">Here!</a></span>
        </div>`;
        });
        appleNews.innerHTML = `<h2>Apple Now</h2>${appleNowHtml}`;
        appleNews.children[1].children[2].style.display = 'none';
    } else {
        appleNews.innerHTML = `<div style="font-size: 3rem; margin-top: 2rem;">Can't show now! 
        Come back in a while.</span></div>`;
    }
};

xhrApple.send();