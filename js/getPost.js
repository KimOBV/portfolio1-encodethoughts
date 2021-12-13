const getID = document.location.search;
const params = new URLSearchParams(getID);
const postID = params.get('id');

const url = 'https://kobv.net/pe1/wp-json/wp/v2/posts?include=' + postID;

const headTitle = document.querySelector('title');
const headMetaText = document.querySelector('head');
const blogPost = document.querySelector('.blog');

async function getPost() {
  const response = await fetch(url);
  const blogPost = await response.json();

  createHTML(blogPost);
}
getPost();

function createHTML(post) {
  headTitle.innerText = `E.T | ${post[0].title.rendered}`;
  headMetaText.innerHTML += `<meta name="description" content="${post[0].title.rendered} - ${post.description}">`;
  blogPost.innerHTML = `<h1>${post[0].title.rendered}</h1><div class="blogPost">${post[0].content.rendered}</div>`;
console.log(post);
  const test = document.querySelectorAll('.blogPost figure img');

  console.log(test);

  test.forEach(function (img) {
    console.log(img.className, img.currentSrc);
    document.querySelector(`.${img.className}`).setAttribute(`onclick`, `modalClick(this.src)`);
  });
}

var modal = document.getElementById('imageModal');
var span = document.getElementsByClassName('modalClose')[0];

function modalClick(className) {
  console.log(className)
  document.querySelector(`.target`).setAttribute('src', className);

  document.querySelector('.modal').style.display = 'block';
}
span.onclick = function () {
  modal.style.display = 'none';
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
