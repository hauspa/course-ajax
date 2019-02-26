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

        $.ajax({
          url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
          headers: {
            Authorization: 'Client-ID 81d30741ff60b78c5f5b25f9218e82b84b813011caae4770aef70b6472275512'
          }
        }).done(addImage)
    })

    function addImage(images) {
      const firstImage = images.results[0]

      responseContainer.insertAdjacentHTML('afterbegin', `<figure>
              <img src="${firstImage.urls.small}" alt="${searchedForText}">
              <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
          </figure>`
      )
    }




})();
