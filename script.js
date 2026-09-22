"use strict";

const filterButtons = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".photo-card");
const photoCount = document.querySelector("#photo-count");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    let visibleCount = 0;
    cards.forEach((card) => {
      card.hidden = button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) visibleCount += 1;
    });
    photoCount.textContent = `${visibleCount}개의 순간`;
  });
});

const dialog = document.querySelector("#photo-dialog");
const dialogImage = document.querySelector("#dialog-image");
let lastPhotoButton;

document.querySelectorAll(".photo-open").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    dialogImage.src = image.getAttribute("src");
    dialogImage.alt = image.alt;
    document.querySelector("#dialog-title").textContent = button.dataset.title;
    document.querySelector("#dialog-description").textContent = button.dataset.description;
    lastPhotoButton = button;
    dialog.showModal();
    document.body.classList.add("modal-open");
  });
});

document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  if (lastPhotoButton) lastPhotoButton.focus();
});

const missions = [
  "☁ 구름에서 닮은 모양을 찾아 찍고, 나만의 이름을 붙여보세요.",
  "☀ 해 질 무렵, 5분 간격으로 같은 하늘을 두 장 찍어보세요.",
  "↗ 나무나 지붕을 액자처럼 넣어 하늘을 담아보세요.",
  "✧ 오늘 하늘의 색을 찍고, 어울리는 기분을 한 단어로 적어보세요.",
  "☁ 화면 가득 하늘만 담아 나만의 휴대폰 배경화면을 만들어보세요.",
  "↗ 늘 지나던 길에서 멈춰, 처음 보는 각도로 하늘을 찍어보세요."
];
let previousMission = -1;
document.querySelector("#mission-button").addEventListener("click", () => {
  let next = Math.floor(Math.random() * (missions.length - 1));
  if (next >= previousMission) next += 1;
  if (previousMission === -1) next = Math.floor(Math.random() * missions.length);
  previousMission = next;
  document.querySelector("#mission").textContent = missions[next];
  document.querySelector("#mission-button").innerHTML = '다른 미션 만나보기 <span aria-hidden="true">↗</span>';
});
