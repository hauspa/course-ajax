/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form')
    const searchField = document.querySelector('#search-keyword')
    let searchedForText
    const responseContainer = document.querySelector('#response-container')

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        responseContainer.innerHTML = ''
        searchedForText = searchField.value

        // Unsplash API call
        $.ajax({
          url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
          headers: {
            Authorization: 'Client-ID 81d30741ff60b78c5f5b25f9218e82b84b813011caae4770aef70b6472275512'
          }
        }).done(addImage)

        // New York Times API call
        $.ajax({
          url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=KZRT0Teq0AzzFYOSdFv5YiGHvo3T0PAe`,
        }).done(addArticles)
    })

    function addImage(images) {
      const firstImage = images.results[0]

      responseContainer.insertAdjacentHTML('afterbegin', `<figure>
              <img src="${firstImage.urls.small}" alt="${searchedForText}">
              <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
          </figure>`
      )
    }

    function addArticles(articles) {

      htmlContent = '<ul>' + articles.response.docs.map(article => `<li class="article">
          <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
          <p>${article.snippet}</p>
        </li>`).join('') + '</ul>'

      responseContainer.insertAdjacentHTML('beforeend', htmlContent)
    }


})();
