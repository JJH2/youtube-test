function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet'
    });

    request.execute(function (response) {
        const listUp = document.querySelector('.search-container');
        listUp.innerHTML = "";
        const player = document.querySelector('#player');

        const ulEl = document.createElement('ul');
        ulEl.classList.add('search-container__list');
        listUp.appendChild(ulEl);
        const searchContainerList = document.querySelector('.search-container__list');

        var str = JSON.stringify(response.result);
        console.log(response)
        for (let item of response.items) {
            const liEl = document.createElement('li');

            // li 만들기
            liEl.classList.add('search-container__list__item');
            searchContainerList.appendChild(liEl);
            // img 만들기
            const imgEl = document.createElement('img');
            imgEl.src = item.snippet.thumbnails.default.url;
            // span 만들기
            const spanEl = document.createElement('span');
            spanEl.textContent = item.snippet.title;

            liEl.addEventListener('click', e => {
                player.innerHTML = "";
                const iframe = document.createElement('iframe');
                iframe.classList.add('YT-iframe');
                iframe.src = `https://www.youtube.com/embed/${item.id.videoId}`
                player.appendChild(iframe);
            })
            liEl.appendChild(imgEl);
            liEl.appendChild(spanEl);

        }

    });

}

document.querySelector('#query').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        search();
    }
})