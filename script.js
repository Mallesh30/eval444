document.addEventListener("DOMContentLoaded", () => {
  const togglescrollbutton = document.getElementById("togglescroll");
  const loadMoreButton = document.getElementById("loadMore");
  const saveDraftButton = document.getElementById("savedraft");
  const loadDraftButton = document.getElementById("loaddraft");
  const filterTitleInput = document.getElementById("filterTitle");
  const filterTagInput = document.getElementById("filterTag");
  const filterAuthorinput = document.getElementById("filterAuthor");

  let ispagination = true;
  let lastsaveDraft = null;
  let isInfiniteScrolling = false;
  let isThrottle = false;

  togglescrollbutton.addEventListener(
    "click",
    throttle(() => {
      ispagination = !ispagination;
      isInfiniteScrolling = !isInfiniteScrolling;
      loadPosts();
    }, 1000)
  );

  saveDraftButton.addEventListener(
    "click",
    throttle(() => {
      savedraft();
    }, 1000)
  );
  loadDraftButton.addEventListener(
    "click",
    throttle(() => {
      loaddraft();
    }, 1000)
  );
  setInterval(() => {
    savedraft();
  }, 2000);
});

filterTitleInput.addEventListener("input", debounce(filterposts, 200));
filterTagInput.addEventListener("input", debounce(filterposts, 200));
filterAuthorinput.addEventListener("input", debounce(filterposts, 200));

document.querySelectorAll("reaction-btn").forEach((button) => {
  button.addEventListener(
    "click",
    throttle(() => {
      handleReaction(button);
    }, 800)
  );
});

loadPosts();

window.addEventListener("scroll", () => {
  if (
    isInfiniteScrolling &&
    window.innerHeight + window.screenY >= document.body.offsetHeight
  )
    loadPosts();
});
