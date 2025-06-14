const prompts = Array.from({ length: 100 }, (_, i) => ({
  creative: `Creative Prompt ${i + 1}: ${generateCreativePrompt(i)}`,
  movement: `Movement Prompt ${i + 1}: ${generateMovementPrompt(i)}`
}));

let currentDay = 0;

function loadPrompt() {
  const p = prompts[currentDay];
  document.getElementById("creative-prompt").innerText = p.creative;
  document.getElementById("movement-prompt").innerText = p.movement;
  document.getElementById("day-number").innerText = currentDay + 1;

  // Restore notes and image if available
  document.getElementById("notes").value = localStorage.getItem(`notes_${currentDay}`) || "";
  const savedImage = localStorage.getItem(`image_${currentDay}`);
  const preview = document.getElementById("preview");
  if (savedImage) {
    preview.src = savedImage;
    preview.style.display = "block";
  } else {
    preview.style.display = "none";
  }

  document.getElementById("completeBtn").innerText = localStorage.getItem(`done_${currentDay}`) === "true" ? "Completed!" : "Mark as Complete";
  document.getElementById("completeBtn").disabled = localStorage.getItem(`done_${currentDay}`) === "true";
}

function markComplete() {
  localStorage.setItem(`done_${currentDay}`, "true");
  localStorage.setItem(`notes_${currentDay}`, document.getElementById("notes").value);
  document.getElementById("completeBtn").innerText = "Completed!";
  document.getElementById("completeBtn").disabled = true;
}

function nextPrompt() {
  if (currentDay < prompts.length - 1) {
    currentDay++;
    loadPrompt();
  } else {
    alert("You’ve completed all 100 days! 🎉");
  }
}

document.getElementById("imageUpload").addEventListener("change", function(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const preview = document.getElementById("preview");
    preview.src = reader.result;
    preview.style.display = "block";
    localStorage.setItem(`image_${currentDay}`, reader.result);
  };
  if (event.target.files[0]) {
    reader.readAsDataURL(event.target.files[0]);
  }
});

function generateCreativePrompt(index) {
  const ideas = [
    "Sketch something that smells good.",
    "Draw your favorite childhood snack.",
    "Create a piece using only three shapes.",
    "Paint your day as a landscape.",
    "Draw the last thing you touched.",
    "Illustrate a dream you've had recently.",
    "Make a mark for every breath you take in a minute.",
    "Draw a sound you hear right now.",
    "Sketch your version of joy.",
    "Create a map to an imaginary place."
  ];
  return ideas[index % ideas.length];
}

function generateMovementPrompt(index) {
  const ideas = [
    "Take a 3-minute walk and count all the green things.",
    "Do 10 jumping jacks while smiling.",
    "Stretch your back and arms for 2 minutes.",
    "Close your eyes and do gentle neck rolls for 1 minute.",
    "March in place while imagining you're on a stage.",
    "Walk barefoot (safely) and notice each step.",
    "Do a breathing exercise for 2 minutes.",
    "Dance to one song without thinking.",
    "Do 10 squats and say one word with each.",
    "Reach high for 10 seconds, then fold forward slowly."
  ];
  return ideas[index % ideas.length];
}

window.onload = function () {
  setTimeout(() => {
    document.getElementById("splash-screen").style.display = "none";
    loadPrompt();
  }, 2000);
};

