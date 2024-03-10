// Function to calculate remaining days
function calculateRemainingDays(targetDate) {
  const currentDate = new Date();
  const daysLeft = Math.ceil(
    (targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysLeft;
}

// Function to update reminder message
function updateReminderMessage(targetDate) {
  const daysLeft = calculateRemainingDays(targetDate);
  if (daysLeft > 0) {
    document.getElementById("daysLeft").textContent = daysLeft; // Update the days left
    document.getElementById("reminderMsg").classList.remove("hidden");
  } else {
    document.getElementById("reminderMsg").classList.add("hidden");
  }
}

// Function to update countdown timer
function updateCountdownTimer(targetDate) {
  const currentDate = new Date();
  const timeDifference = targetDate.getTime() - currentDate.getTime();

  if (timeDifference > 0) {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById(
      "countdownTimer"
    ).textContent = `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
    setTimeout(updateCountdownTimer, 1000, targetDate);
  } else {
    document.getElementById("countdownTimer").textContent =
      "Waktu pengingat sudah lewat.";
  }
}

// Function to show system notification
function showSystemNotification(message) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(message);
  } else if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        new Notification(message);
      }
    });
  }
}

// Event listener for reminder button
document.getElementById("reminderBtn").addEventListener("click", function () {
  const selectedDate = new Date(document.getElementById("reminderDate").value);
  if (isNaN(selectedDate.getTime())) {
    alert("Tanggal yang dimasukkan tidak valid.");
    return;
  }
  localStorage.setItem("reminderDate", selectedDate.getTime());
  updateReminderMessage(selectedDate);
  updateCountdownTimer(selectedDate);
  showSystemNotification("Pengingat: Saatnya menabung!");
});

// Check for existing reminder date
const savedReminderDate = localStorage.getItem("reminderDate");
if (savedReminderDate) {
  const targetDate = new Date(Number(savedReminderDate));
  document.getElementById("reminderDate").value = targetDate
    .toISOString()
    .slice(0, 10); // Set input date value
  updateReminderMessage(targetDate);
  updateCountdownTimer(targetDate);
}
