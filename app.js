const nHentai = require("shentai");
const path = require("path");
const doujins = new nHentai;
const express = require('express');
const app = express();
const port = 5500;

app.use(express.static(path.join(__dirname, "scripts")));
app.use(express.static(path.join(__dirname, "styles")));
app.use(express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");

app.get('/', async (req, res) => {
  let popularDoujins = await doujins.getPopular();
  let popularString = await JSON.stringify(popularDoujins);
  res.render("index", {popular : popularString});
})

app.get('/random', (req, res) => {
  doujins.getRandom().then(doujin => {
    res.render("random", {sauce : doujin.id.toString()})
  })
})

app.get('/random/:search_value', (req, res) => {
  doujins.search(req.params.search_value).then(async search => {
    let doujin;
    let currentPage = search;
    if(search.allDoujinsCount > 1000){
      let randomPage = Math.ceil(search.lastPage * Math.random());
      currentPage = await search.getPage(randomPage);
      doujin = currentPage.results[Math.floor(currentPage.results.length * Math.random())];
    }
    else{
      let targetDoujin = Math.ceil(search.allDoujinsCount * Math.random());
      let currentDoujin = currentPage.results.length - 1;
      while(currentDoujin < targetDoujin){
        currentPage = await currentPage.next();
        currentDoujin += currentPage.results.length;
      }
      doujin = currentPage.results[currentPage.results.length + targetDoujin - currentDoujin - 1];
    }
    res.render("random", {sauce : doujin.id.toString()});
  })
})

app.get('/g/:sauce/:page', async (req, res) => {
  let doujin = await doujins.getDoujin(req.params.sauce);
  res.render("g", {
    imageLink : req.params.page == 0 ? doujin.cover : doujin.pages[req.params.page - 1],
    maxPage : (doujin.pages.length + 1).toString(),
    currentPage : (parseInt(req.params.page) + 1).toString()
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://127.0.0.1:${port}`);
})