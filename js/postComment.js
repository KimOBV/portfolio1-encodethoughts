var quickAddBtn = document.querySelector('#quick-add-button');
const siteURL = 'https://kobv.net/pe1/wp-json/wp/v2/comments?post=' + postID;

var cancelComment = function (commentID, object) {
  if (commentID != 0) {
    document.querySelector(`#replyForm${commentID}`).innerHTML = ``;
    document.querySelector(`.replyVis${commentID}`).style.display = `block`;
  } else {
    document.querySelector(`#commentForm`).innerHTML = ``;
    document.querySelector(`#replyVis0`).style.display = `block`;
  }
};

var commentID = function (commentID, object) {
  if (commentID != 0) {
    document.querySelector(`#replyForm${commentID}`).innerHTML = `
    <form  class="commentBox" action="register.jsp" method="post">
        <input class="input" required type="text" name="name" placeholder="Name" />
        <input class="input" required type="email" name="email" placeholder="Email" />
        <textarea rows="5" class="input" required name="comment" placeholder="Comment"></textarea>
        <button class="button" onclick="cancelComment(${commentID})">Cancel</button>
        <input class="button" type="submit" value="Reply" />
    </form>`;
    document.querySelector(`.replyVis${commentID}`).style.display = `none`;
  } else {
    document.querySelector(`#commentForm`).innerHTML = `
    <form class="commentBox animate__fadeInDown" action="register.jsp" method="post">
        <input class="input" required type="text" name="name" placeholder="Name" />
        <input class="input" required type="email" name="email" placeholder="Email" />
        <textarea rows="5" class="input" required name="comment" placeholder="Comment"></textarea>
        <button class="button" onclick="cancelComment(0)">Cancel</button>
        <input class="button" type="submit" value="Reply" />
    </form>`;
    document.querySelector(`#replyVis0`).style.display = `none`;
  }
  fetch('https://kobv.net/pe1/wp-json/wp/v2/posts')
    .then(function (response) {
      return response.json();
    })
    .then(function (posts) {
      //console.log(posts);
    });
  document.querySelector('form.commentBox').addEventListener('submit', function (e) {
    e.preventDefault();

    let input = document.querySelector('form.commentBox').elements;
    var comName = input['name'].value;
    var comEmail = input['email'].value;
    var comText = input['comment'].value;

    fetch('https://kobv.net/pe1/wp-json/wp/v2/comments?post=' + postID, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: 'Bearer ',
      },
      body: JSON.stringify({
        author_name: comName,
        author_email: comEmail,
        content: comText,
        parent: commentID,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (post) {
        document.location.reload(true);
      });
  });
};
