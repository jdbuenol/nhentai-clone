$(function(){
    const searchButton = $(".search")[0];
    const randomButton = $(".random")[0];
    const sauce = $(".sauce")[0];
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
})