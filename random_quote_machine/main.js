function makeHexColor() {
  var values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  var hex = '#';

  for (var i = 0; i < 6; i++) {
    hex += values[Math.floor(Math.random() * values.length)];
  }

  return hex;
}

$(function() {
  function setColor() {
    var color = makeHexColor();

    $('body, a').css({
      background: color
    });

    $('#quote').css({
      color: color
    });
  }

  function setQuote() {
    $.ajax({
      cache: false,
      url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
      dataType: "json",
      success: function(data) {
        console.log(data);
        var quote = data[0].content;
        var title = data[0].title;
        var $quote = $('#quote');

        $quote.hide();
        $quote.html(quote);
        $quote.prepend('<i class="fa fa-quote-left" aria-hidden="true"></i>');
        $quote.append('<p>- ' + title + '</p>');
        $quote.fadeIn(2000);

        makeLink();
      }
    });
  }

  function makeLink() {
    var quote = $('#quote i + p').text();
    var title = $('#quote p:last-child').text();
    var link = 'https://twitter.com/intent/tweet';

    link += "?hashtags=quotes&text=" + encodeURIComponent(quote + title);

    $('#twitter').prop('href', link);
  }

  $('#new-quote').on('click', function(e) {
    e.preventDefault();

    setColor();
    setQuote();
  });

  setColor();
  setQuote();
});
