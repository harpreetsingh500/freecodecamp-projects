function getDataForLiveStreams() {
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams?limit=10&client_id=h2aru1941ywk5cip2ly1f48ku4qi3sg',
    dataType: 'jsonp',
    success: function(data) {
      showDataForLiveStreams(data);
    }
  });
}

function showDataForLiveStreams(data) {
  var template = Handlebars.compile($('#live-streams').html());
  var streams = data.streams;
  var streamInfo = {};

  streams.forEach(function(obj) {
    streamInfo.imgLink = obj.preview.medium;
    streamInfo.viewers = obj.viewers;
    streamInfo.streamLink = obj.channel.url;
    streamInfo.title = obj.channel.status;
    streamInfo.name = obj.channel.name;
    streamInfo.game = obj.channel.game;

    $('#top-streams').append(template(streamInfo));
  });
}

function getDataForSpecificStreams() {
  var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var streamerObj = {};

  streams.forEach(function(streamName, idx) {
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/' + streamName + '?&client_id=h2aru1941ywk5cip2ly1f48ku4qi3sg',
      dataType: 'jsonp',
      success: function(data) {
        streamerObj[idx] = {};
        streamerObj[idx].name = streamName;
        streamerObj[idx].title = data.stream === null ? 'offline' : data.stream.channel.status;
        streamerObj[idx].link = 'https://www.twitch.tv/' + streamName;

        getLogo(streamerObj[idx]);
      }
    });
  });
}

function getLogo(data1) {
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/channels/' + data1.name + '?&client_id=h2aru1941ywk5cip2ly1f48ku4qi3sg',
    dataType: 'jsonp',
    success: function(data2) {
      data1.logo = data2.logo;
      showDataForSpecificStreams(data1);
    }
  });
}

function showDataForSpecificStreams(data) {
  var template = Handlebars.compile($('#all-streams').html());
  $('#streams').append(template(data));

  if (data.title !== 'offline') {
    $('#streams div:last-child').addClass('online');
  } else {
    $('#streams div:last-child').addClass('offline');
  }
}

$(function() {
  $('#top-streams h2').on('click', function() {
    $('.stream').slideToggle(2000);
  });

  $('nav li a').on('click', function(e) {
    e.preventDefault();

    $('nav li a').removeClass('highlight');
    $(this).addClass('highlight');
  });

  $('#online').on('click', function() {
    $('.offline').hide();
    $('.online').show();
  });

  $('#offline').on('click', function() {
    $('.online').hide();
    $('.offline').show();
  });

  $('#all').on('click', function() {
    $('.online, .offline').show();
  });

  getDataForLiveStreams();
  getDataForSpecificStreams();
});
