let profileData = {};
const dailyButton = document.getElementById("dailyButton");
const monthlyButton = document.getElementById("monthlyButton");
const weeklyButton = document.getElementById("weeklyButton");
const currentPerformance = document.querySelectorAll(".dashboard__current");
const pastPerformance = document.querySelectorAll(".dashboard__past");

//updating the performance
const perfomranceUpdater = (timeframe, previous) => {
  for (let item = 0; item < currentPerformance.length; item++) {
    currentPerformance[item].textContent =
      profileData[item].timeframes[timeframe].current + "hrs";
    pastPerformance[item].textContent =
      `${previous} - ` +
      profileData[item].timeframes[timeframe].previous +
      "hrs";
  }
};

//changin buttons active states
const changeActiveButton = (buttonId) => {
  const currentActiveButton = document.querySelector(".active--button");
  currentActiveButton.classList.remove("active--button");
  buttonId.classList.add("active--button");
};

const gettigData = async () => {
  try {
    const response = await fetch("../data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    profileData = await response.json();
    perfomranceUpdater("daily", "Yesterday");

    dailyButton.addEventListener("click", () => {
      perfomranceUpdater("daily", "Yesterday");
      changeActiveButton(dailyButton);
    });

    weeklyButton.addEventListener("click", () => {
      perfomranceUpdater("weekly", "Last Week");
      changeActiveButton(weeklyButton);
      
    });

    monthlyButton.addEventListener("click", () => {
      perfomranceUpdater("monthly", "Last Month");
      changeActiveButton(monthlyButton);

    });
  } catch (error) {
    console.log("Error:", error);
  }
};

gettigData();
