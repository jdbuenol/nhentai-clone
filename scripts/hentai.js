$(function(){
    const searchButton = $(".search")[0];
    const randomButton = $(".random")[0];
    const popularDoujins = JSON.parse($(".popular")[0].getAttribute("doujins"));
    const sauce = $(".sauce")[0];
    const popularSection = $(".grid-popular")[0];

    searchButton.addEventListener("click", () => {
        if(isNaN(sauce.value) || sauce.value == "");
        else{
            window.location.assign(`/g/${sauce.value}/0`);
        }
    });
    randomButton.addEventListener("click", () => {
        if(sauce.value != "") window.location.assign(`/random/${sauce.value}`);
        else window.location.assign("/random");
    })

    for(let i = 0; i < 5; i++){
        let currentDoujin = popularDoujins[i];
        let id = currentDoujin.id;
        popularSection.innerHTML += `<div class="card mt-3 mx-3 col-3 hentai-card bg-dark" id="${id}">
        <img class="card-img-top" src="${currentDoujin.cover}" alt="Card image cap">
        <div class="card-body hentai-name">
          <p class="card-text">${currentDoujin.titles.english}</p>
        </div>
        </div>`
    }
    let hentaiCards = $(".hentai-card");
    hentaiCards.click(button => {
        let currentTarget = button.currentTarget;
        window.location.assign(`/g/${currentTarget.id}/0`);
    })
})