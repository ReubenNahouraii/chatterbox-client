class App {
  constructor() {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
    this.init();
  }

  init () {
    $(".username").on( "click", this.handleUsernameClick);
    $("#send .submit").on( "submit", this.handleSubmit);
    this.fetch();

  }

  send (message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }

  placePosts (dataObj) {
    debugger;
    let dataArray = dataObj.results;
    let username, text, roomname;
    for (let post of dataArray){
      ({username, text, roomname} = post);
      var newDiv = document.createElement("div").appendChild(document.createTextNode(username))
      newDiv.className = 'post';
      debugger;
      //var newText = document.createDiv(document.createTextNode(text));
      //newText.className = 'post';
      $('#chats').append(newDiv);
      $('#chats').append(': <br>');
      $('#chats').append(newText);
      $('#chats').append('<br><br>');
    }
  }

  fetch () {
    let that = this;
    $.ajax({
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        that.placePosts(data);
        console.log('chatterbox: Recieved message');
      },
      error: function (data) {
        console.error('chatterbox: Failed to get message');
      }
    });
  }

  clearMessages () {
    //$(#chats).empty();
    $('#chats').empty();
  }

  renderMessage ({username, text, roomname}) {
    $('#chats').append(`<p>Username: <span class = "username">${username}</span> <br>
      test: ${text} <br>
      roomname: ${roomname}`);
  }

  renderRoom (room) {
    let stringRoom = JSON.stringify(room);
    $('#roomSelect').append(`<p>${stringRoom}</p>`);
  }

  handleUsernameClick () {

  }

  handleSubmit () {

  }

};

var app = new App()