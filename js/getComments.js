const urlCom = `https://kobv.net/pe1/wp-json/wp/v2/comments?post=` + postID + `&per_page=100&orderby=parent&order=asc`;
const resCon = document.querySelector('.comments');

async function getComments(urlCom) {
  const response = await fetch(urlCom);
  const comments = await response.json();

  comments.forEach(function (com) {
    if (com.parent === 0) {
      document.querySelector(`.comments`).innerHTML += `<div class="comment" id="comment-${com.id}">
  <img src="${com.author_avatar_urls[48]}" alt="${com.author_name}'s avatar" class="avatar" />
  <b class="cName">${com.author_name}</b>
  <span class="says">says:</span><br>
  <span>${com.date_gmt.replace('T', '   ')}</span>
  <div class="comment-content">${com.content.rendered}</div>
<button class="replyVis${com.id}" onclick="commentID(${com.id})">Reply</button>
  <div id="replyForm${com.id}"></div>
  <div class="reply" id="parent-${com.id}"></div>
</div>`;
    }
    if (com.parent != 0) {
      document.querySelector(`#parent-${com.parent}`).innerHTML += `<div class="child" id="comment-${com.id}">
  <img src="${com.author_avatar_urls[48]}" alt="${com.author_name}'s avatar" class="avatar" />
  <b class="cName">${com.author_name}</b>
  <span class="says">says:</span><br>
  <span>${com.date_gmt.slice(0, com.date_gmt.length - 3).replace('T', '   ')}</span>
  <div class="comment-content">${com.content.rendered}</div>
  <input style="display: none;" id="name"  value="${com.id}" />
<button class="replyVis${com.id}" onclick="commentID(${com.id})">Reply</button>
  <div id="replyForm${com.id}"></div>
  <div class="reply" id="parent-${com.id}"></div>
</div>`;
    }
  });
}
getComments(urlCom);
