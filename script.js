const giftImages = {
  gift1: "pole-fitness.jpg",
  gift2: "veg-patch.jpg"
};

function enterSite() {
  document.getElementById("intro").classList.add("hidden");
  document.querySelector(".container").classList.remove("hidden");
}

function openGift(id) {
  const voucherId = id === "gift1" ? "voucher1" : "voucher2";

  // hide the gift icon
  const icon = document.getElementById("icon-" + id);
  if (icon) icon.style.display = "none";

  // show voucher
  document.getElementById(voucherId).classList.add("active");

  // confetti
  launchConfetti();
}

function closeVoucher(id) {
  const voucherId = id === "gift1" ? "voucher1" : "voucher2";
  document.getElementById(voucherId).classList.remove("active");

  // set card background to present image (simulate opened)
  const card = document.getElementById(id);
  card.style.backgroundImage = `url(${giftImages[id]})`;
}

function launchConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const numPieces = 150; // num of confetti

  // Initialize confetti pieces
  for (let i = 0; i < numPieces; i++) {
    pieces.push({
      x: Math.random() * canvas.width,       // random horizontal start
      y: Math.random() * -canvas.height,     // start above the screen
      size: Math.random() * 8 + 4,           // size of confetti
      speedX: (Math.random() - 0.5) * 4,     // slight horizontal drift
      speedY: Math.random() * 8 + 6,         // fast downward speed
      color: `hsl(${Math.random() * 360}, 90%, 60%)`, // vibrant color
      gravity: Math.random() * 0.3 + 0.2,    // acceleration
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    });
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let active = false;

    pieces.forEach(p => {
      // move
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += p.gravity; // accelerate downward
      p.rotation += p.rotationSpeed;

      // draw rotated rectangle
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();

      // check if still on screen
      if (p.y < canvas.height) active = true;
    });

    if (active) {
      requestAnimationFrame(update);
    }
  }

  update();
}

