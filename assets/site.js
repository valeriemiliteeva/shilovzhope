// Active link highlight based on filename
(() => {
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll('.links a').forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === page) a.classList.add("active");
  });
})();

// Title randomizer + conditional video swap (Home page)
(() => {
  const headline = document.getElementById("headline");
  const randomBtn = document.getElementById("random");
  const video = document.getElementById("heroVideo");

  if (!headline || !randomBtn || !video) return;

  const DEFAULT_SRC = "assets/luntik.mp4";
  const MEDVED_SRC  = "assets/tuchka.mp4";

  const names = [
    "Папочка",
    "Папундeль",
    "Медведь",
    "Папусик",
    "Папка",
    "Андрюшка"
  ];

  function setTitleAndVideo(name) {
    const text = `С Днём Рождения, ${name}!!`;
    document.title = text;
    headline.textContent = text;

    const newSrc = (name === "Медведь") ? MEDVED_SRC : DEFAULT_SRC;

    // Only reload video if it actually needs to change
    if (!video.currentSrc.includes(newSrc)) {
      const wasMuted = video.muted;
      const currentTime = 0; // or keep time if you want

      video.pause();
      video.src = newSrc;
      video.load();
      video.currentTime = currentTime;
      video.muted = wasMuted;
      video.play().catch(() => {});
    }
  }

  randomBtn.addEventListener("click", () => {
    const choice = names[Math.floor(Math.random() * names.length)];
    setTitleAndVideo(choice);
  });
})();



// Sound toggle (Home page)
(() => {
  const video = document.getElementById("heroVideo");
  const soundBtn = document.getElementById("soundToggle");
  if (!video || !soundBtn) return;

  soundBtn.addEventListener("click", async () => {
    try {
      if (video.muted) {
        video.muted = false;
        video.volume = 1.0;
        await video.play();
        soundBtn.textContent = "🔇 Выключить звук";
      } else {
        video.muted = true;
        soundBtn.textContent = "🔊 Включить звук";
      }
    } catch (e) {
      console.warn("Audio toggle blocked:", e);
    }
  });
})();
