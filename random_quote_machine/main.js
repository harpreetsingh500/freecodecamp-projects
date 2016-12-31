function makeColor() {
  var values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'],
      color = '#';

  for (var i = 0; i < 6; i++) {
    color += values[Math.floor(Math.random() * values.length)];
  }

  return color;
}

var App = {
  initialPageLoad: true,
  data: {},
  duration: 600,
  quoteImage: '<i class="fa fa-quote-left" aria-hidden="true"></i>',
  init: function() {
    this.$quote = $('#quote');
    $('#new-quote').click();
  },
  getQuote: function(event) {
    event.preventDefault();

    $.ajax({
      cache: false,
      url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
      dataType: "json",
      success: function(data) {
        this.data = {
          quote: data[0].content,
          title: data[0].title
        };

        this.setQuote();
      }.bind(App)
    });
  },
  setColor: function() {
    var color = makeColor();

    $('body, a').css({
      background: color
    });

    this.$quote.css({
      color: color
    });
  },
  setQuote: function() {
    if (this.initialPageLoad) {
      this.appendData().hide().slideDown(this.duration);
      this.initialPageLoad = false;
    } else {
      this.$quote
          .slideUp(this.duration, this.appendData.bind(this))
          .slideDown(this.duration);
    }
  },
  appendData: function() {
    this.$quote.html('')
    this.setColor()
    this.$quote.append(this.quoteImage);
    this.$quote.append(this.data.quote);
    this.$quote.append(this.data.title);
    this.makeTwitterLink();

    return this.$quote;
  },
  makeTwitterLink: function() {
    var quote = $('#quote i + p').text(),
        link = 'https://twitter.com/intent/tweet';

    link += "?hashtags=quotes&text=" + encodeURIComponent(quote + this.data.title);

    $('#twitter').prop('href', link);
  }
}

$(function() {
  $('#new-quote').on('click', App.getQuote);

  App.init();
});
