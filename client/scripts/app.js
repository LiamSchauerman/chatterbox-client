// YOUR CODE HERE:

var app = {
  room: 'lobby',
  user: window.location.search.slice(10),
  init: function() {
    // console.log('started');
    $('#display').on('click', app.fetch);
    $('#main').on('click','.username', function() {
      app.addFriend();
    });
    $('input:submit').on('click', function(e) {
      e.preventDefault();
      //e.stopPropogation();
      app.handleSubmit(e);
      // console.log("submits");
    });
    $('#roomList button').on('click', function() {
      // console.log($(this), $(this).attr('id'));
      app.room = $(this).attr('id');
      //setInterval(function(){ app.fetch(app.room) }, 500)
    })
  },
  send: function(message) {
    $.ajax({
  // always use this url
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {

        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  server:'https://api.parse.com/1/classes/chatterbox',
  fetch: function(room) {
     //console.log(room);
      // app.clearMessages();
    room = room || 'lobby';
    $.ajax({
  // always use this u
      // url: 'https://api.parse.com/1/classes/chatterbox?where={"createdAt":{"%gt":"2014-09-21T01:00:00"}}',
      //url: app.server,

      url: app.server + '?order=-createdAt&roomname=' + room,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {

        // app.clearMessages();
        console.log(data);
        var htmlString = '';
        for(var i=0; i<10; i++){

          htmlString += '<li><span class="username">' + data.results[i].username + "</span>: " + data.results[i].text + ' room name:' + data.results[i].roomname + '</li> ';
          $("#chats").html(htmlString);
          // app.addMessage(data.results[i])
        }

      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message');
      }
    });
  },
  clearMessages: function() {
    $('#chats').html('');
  },
  //message is JSON object
  addMessage: function(messages) {
      if(messages.username !== "JAMES") {
      var text = messages.text;
      if(text.indexOf('script') > -1 || text.indexOf('img') > -1 || text.indexOf('$') > -1 || text.indexOf('jQuery') > -1){
        text = 'nice try';
      }
      var user = messages.username;
      if(user.indexOf('script') > -1 || user.indexOf('img') > -1 || user.indexOf('$') > -1 || user.indexOf('jQuery') > -1){
        user = 'nice try';
      }
      var roomname = messages.roomname;
      if(roomname.indexOf('script') > -1 || roomname.indexOf('img') > -1 || roomname.indexOf('$') > -1 || roomname.indexOf('jQuery') > -1){
        roomname = 'nice try';
      }
      $('#chats').append('<li><span class="username">' + user + "</span>: " + text + 'room name:' + roomname + '</li> ');
    }
  },
  addRoom: function(roomName) {
    $('#roomSelect').append('<li>' + roomName + '</li>')
  },
  addFriend: function() {
    //.log('adding friend')
  },
  handleSubmit: function() {
    // e.preventDefault();
    // console.log('handleSubmit');
    var text = $('#message').val();
    $('#message').val('');
    app.send({
      "username": app.user,
      "text": text,
      "roomname": "<script>$('#main').html(<img src='http://nicolascage.us/wp-content/uploads/2013/12/laser-cage.gif' />)</script>"
    });
    // app.clearMessages();
    app.fetch();

  }

};


$(document).ready(function() {
  app.init();
  var message = "lol";
  setInterval(function() { app.fetch(app.room);}, 500)
  //setInterval(app.handleSubmit, 500)
  // $('#display').on('click', app.fetch);
  // $('#main').on('click','.username', function() {
  //   app.addFriend();
  // });

  // $('#send .submit').on('click',function(e) {
  //   //debugger;
  //   app.handleSubmit();



  // // });
  // });
});
