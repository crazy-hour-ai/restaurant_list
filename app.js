const express = require('express');
const exphbs = require('express-handlebars');
const restaurantList = require('./restaurant.json');

const app = express();

const port = 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
  // console.log(restaurantList.results);
  res.render('index', { restaurants: restaurantList.results });
})

app.get('/search', (req, res) => {
  const searchKeyword = req.query.keyword;
  const restaurantSearch = restaurantList.results.filter(
    (restaurant) => {
      return restaurant.name.toLowerCase().includes(searchKeyword);
    }
  )

  res.render('index', { restaurants: restaurantSearch, keyword: searchKeyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantFilter = restaurantList.results.filter(
    (restaurant) => {
      return restaurant.id == req.params.restaurant_id;
    }
  )
  console.log("filter", restaurantFilter);
  res.render('show', { restaurant: restaurantFilter[0] });
})

app.listen(port, () => {
  console.log(`Server is start on http://localhost:${port}`);
})