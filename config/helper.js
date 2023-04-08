const exphbs = require('express-handlebars')

exphbs.registerHelper('sortingLogic', function (restaurants, sortField) {
  const sortedRestaurants = restaurants.sort(function (a, b) {
    if (sortOrder === 'desc') {
      return b[sortField] - a[sortField];
    } else {
      return a[sortField] - b[sortField];
    }
  });
  return sortedRestaurants;
});