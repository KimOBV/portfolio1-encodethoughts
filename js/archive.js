const loadPosts = (() => {
  const config = {
    api: 'https://kobv.net/pe1/wp-json/wp/v2/posts',
    startPage: 0,
    postsPerPage: 10,
  };
  const postContent = document.querySelector('.posts');
  const loadMoreButton = document.querySelector('#btn-load-more');

  const loadContent = function loadContent() {
    ++config.startPage;
    const params = {
      _embed: true,
      page: config.startPage,
      per_page: config.postsPerPage,
    };
    const getApiUrl = (url) => {
      let apiUrl = new URL(url);
      apiUrl.search = new URLSearchParams(params).toString();
      return apiUrl;
    };
    const loadPosts = async () => {
      const url = getApiUrl(config.api),
        request = await fetch(url),
        posts = await request.json(),
        postsHtml = renderPostHtml(posts);

      postContent.innerHTML += postsHtml;
      postsLoaded = true;
    };
    const renderPostHtml = (posts) => {
      let postHtml = '';
      for (let post of posts) {
        postHtml += postTemplate(post);
      }
      return postHtml;
    };

    const postTemplate = (post) => {
      return `
            <div id="post-${post.id}" class="post">
              <img src="${post._embedded['wp:featuredmedia'][0].source_url}" />
              <h2><a href="/blog.html?id=${post.id}">${post.title.rendered}</h2>
              <p>${post.excerpt.rendered}</p><button class="button-1" role="button">Read</button></a>
            </div>`;
    };
    loadPosts();
  };
  loadContent();
  loadMoreButton.addEventListener('click', loadContent);
})();
