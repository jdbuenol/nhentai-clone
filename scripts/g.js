$(function(){
    const searchButton = $(".search")[0];
    const pages = $(".pages");
    const randomButton = $(".random")[0];
    const backButton = $(".back");
    const forwardButton = $(".forward");
    const sauce = $(".sauce")[0];

    $(".pageInfo")[0].innerHTML = `${pages.attr("currentpage")} of ${pages.attr("maxpage")}`
    
    if(pages.attr("currentPage") == 1) backButton.hide();
    if(pages.attr("currentPage") == pages.attr("maxpage")) forwardButton.hide();

    searchButton.addEventListener("click", () => {
        if(isNaN(sauce.value) || sauce.value == "");
        else{
            window.location.assign(`/g/${sauce.value}/0`);
        }
    });

    randomButton.addEventListener("click", () => {
        if(sauce.value != "") window.location.assign(`/random/${sauce.value}`);
        else window.location.assign("/random");
    });

    backButton.click(() => {
        window.location.replace(parseInt(pages.attr("currentPage")) - 2);
    });

    forwardButton.click(() => {
        window.location.replace(parseInt(pages.attr("currentPage")));
    });
})