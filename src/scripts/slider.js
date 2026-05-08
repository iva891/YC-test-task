function createSlider(root, options = {}) {
  const track = root.querySelector(".slider__track");
  const slides = Array.from(track?.children || []);
  const prevButtons = root.querySelectorAll('[aria-label="Назад"]');
  const nextButtons = root.querySelectorAll('[aria-label="Вперед"]');
  const currentText = root.querySelector(".pager__current");
  const totalText = root.querySelector(".pager__total");

  if (!track || slides.length === 0) return;

  const loop = Boolean(options.loop);
  const autoplay = Boolean(options.autoplay);
  let currentIndex = 0;

  function updateCounter() {
    if (currentText) currentText.textContent = String(currentIndex + 1);
    if (totalText) totalText.textContent = String(slides.length);
  }

  function goTo(index) {
    currentIndex = index;
    track.scrollTo({
      left: slides[currentIndex].offsetLeft - slides[0].offsetLeft,
      behavior: "smooth",
    });
    updateCounter();
  }

  function next() {
    if (currentIndex < slides.length - 1) {
      goTo(currentIndex + 1);
      return;
    }
    if (loop) goTo(0);
  }

  function prev() {
    if (currentIndex > 0) {
      goTo(currentIndex - 1);
      return;
    }
    if (loop) goTo(slides.length - 1);
  }

  nextButtons.forEach((button) => button.addEventListener("click", next));
  prevButtons.forEach((button) => button.addEventListener("click", prev));

  if (autoplay) {
    setInterval(next, 4000);
  }

  updateCounter();
}

export default function initSliders() {
  const playersSlider = document.querySelector(".players.slider__track")?.closest(".slider");
  const stepsSlider = document
    .querySelector(".transformation__steps.slider__track")
    ?.closest(".slider");

  if (playersSlider) {
    createSlider(playersSlider, { loop: true, autoplay: true });
  }

  if (stepsSlider) {
    createSlider(stepsSlider, { loop: false, autoplay: false });
  }
}
