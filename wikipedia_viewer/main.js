function resetHTML() {
  $('#search-results').html('');
  $('#search-results').hide();
}

function toggleSearch() {
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
  var searchResults = data.query.search;
  var template = Handlebars.compile($('#post').html());
  var wikiPost = {};
  var $searchResults = $('#search-results');
  
  searchResults.forEach(function(obj) {
    wikiPost.title = obj.title;
    wikiPost.snippet = obj.snippet;
    wikiPost.link = 'https://en.wikipedia.org/wiki/' + obj.title.split(' ').join('_');
    
    $searchResults.append(template(wikiPost));
  });
  
  $searchResults.fadeIn(3000);
}

$(function() {
  $('#search-img, #close').on('click', function(e) {
    e.preventDefault();
    toggleSearch();
  });
  
  $('#close').on('click', function(e) {
    resetHTML();
  });
  
  $('#search').keypress(function(e) {
    var key = e.which;
    
    if (key === 13) {
      resetHTML();
      getData();
    }
  });
});
