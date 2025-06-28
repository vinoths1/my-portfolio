AOS.init();

document.addEventListener('click', (e) => {
  const circle = document.createElement('div');
  circle.className = 'click-circle';
  circle.style.left = `${e.clientX - 20}px`;
  circle.style.top = `${e.clientY - 20}px`;

  document.body.appendChild(circle);

  requestAnimationFrame(() => {
    circle.style.transform = 'scale(2)';
    circle.style.opacity = '0';
  });

  setTimeout(() => circle.remove(), 400);
});

const createDewDrop = () => {
  const drop = document.createElement('div');
  drop.classList.add('dew-drop');
  drop.style.left = Math.random() * 100 + 'vw';
  drop.style.animationDuration = (Math.random() * 4 + 2) + 's';
  document.body.appendChild(drop);
  setTimeout(() => drop.remove(), 6000);
};
setInterval(createDewDrop, 250);
