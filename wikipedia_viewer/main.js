function deleteData(e) {
  e.preventDefault();

  $('#search-results').html('');
}

function toggleView(e) {
  e.preventDefault();

  $('#search').val('');
  $('#search, #close').toggle();
  $('#search-message').toggle();
  $('#search-img').toggle();
}

function getData() {
  var title = $('#search').val(),
      encodedTitle = encodeURIComponent(title),
      url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=' + encodedTitle;

  $.ajax({
    type: "GET",
    url: url,
    dataType: 'jsonp',
    success: function(data) {
      showData(data);
    }
  });
}

function showData(data) {
  var searchResults = data.query.search,
      template = Handlebars.compile($('#post').html()),
      wikiPost = {},
      $searchResults = $('#search-results');

  searchResults.forEach(function(obj) {
    wikiPost.title = obj.title;
    wikiPost.snippet = obj.snippet;
    wikiPost.link = 'https://en.wikipedia.org/wiki/' + obj.title.split(' ').join('_');

    $searchResults.append(template(wikiPost));
  });

  $searchResults.fadeIn(2000);
}

$(function() {
  $('#search-img, #close').on('click', toggleView);

  $('#close').on('click', deleteData);

  $('#search').keypress(function(e) {
    if (e.which === 13) {
      deleteData(e);
      getData();
    }
  });
});
