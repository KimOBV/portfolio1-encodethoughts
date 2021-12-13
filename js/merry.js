const urlFt = `https://kobv.net/pe1/wp-json/wp/v2/posts?_embed`;
const resCon = document.querySelector('.comments');

async function getComments(urlFt) {
  const response = await fetch(urlFt);
  const postFt = await response.json();

  postFt.forEach(function (ft) {
    document.querySelector(`.merryContainer`).innerHTML += `
    <div class="va-card">
        <a class="link-plain" href="/blog.html?id=${ft.id}">
            <img class="va-thumbnail" src="${ft._embedded['wp:featuredmedia']['0'].source_url}" />
            <span class="va-title">${ft.title.rendered}</span>
        </a>
    </div>`;
    console.log(ft)
  });
}
getComments(urlFt);

merryID = document.getElementById(`merryID`);

function touchScroll(merryID) {
  if (touchDevice()) {
    var scrollPositionStart = 0;

    document.getElementById(merryID).addEventListener(
      'touchstart',
      function (event) {
        scrollPositionStart = this.scrollLeft + event.touches[0].pageX;
      },
      false
    );
    document.getElementById(merryID).addEventListener(
      'touchmove',
      function (event) {
        this.scrollLeft = scrollPositionStart - event.touches[0].pageX;
      },
      false
    );
  }
}
function touchDevice() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}
touchScroll('merryID');

var animationActive = false;

function scrollLeft(element, unit) {
  if (!element || animationActive) {
    return;
  }
  var time = 400;
  var from = element.scrollLeft;
  var aframe = 1;
  animationActive = true;

  var start = new Date().getTime(),
    timer = setInterval(function () {
      var space = Math.min(1, (new Date().getTime() - start) / time);
      element.scrollLeft = space * unit + from;
      if (space === 1) {
        clearInterval(timer);
        animationActive = false;
      }
    }, aframe);
}
function merryGoRound(merryGoID) {
  var target = document.querySelector('#' + merryGoID + ' .merryContainer');
  var blogPostOuterWidth;
  var maxMerryScroll;

  function updateMerryInfo() {
    blogPostOuterWidth = document.querySelector('#' + merryGoID + ' .va-card').offsetWidth;
    maxMerryScroll =
      document.querySelectorAll('#' + merryGoID + ' .va-card').length * blogPostOuterWidth -
      document.querySelector('#' + merryGoID + ' .merryContainer').clientWidth;
  }
  document.querySelector('#' + merryGoID + ' .merryGoLeft').addEventListener('click', function () {
    updateMerryInfo();
    if (target.scrollLeft > 0) {
      scrollLeft(target, -blogPostOuterWidth * 2);
    }
  });
  document.querySelector('#' + merryGoID + ' .merryGoRight').addEventListener('click', function () {
    updateMerryInfo();
    if (target.scrollLeft < maxMerryScroll) {
      scrollLeft(target, blogPostOuterWidth * 2);
    }
  });
}
merryGoRound('merryFrame');
