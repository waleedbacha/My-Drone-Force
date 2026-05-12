// Cohort dates for 2026-2027
const getCohorts = () => {
  const currentYear = new Date().getFullYear();

  return [
    {
      name: "June 18",
      date: new Date(currentYear, 5, 18),
      month: "June",
      day: 18,
      year: currentYear,
    },
    {
      name: "July 20",
      date: new Date(currentYear, 6, 20),
      month: "July",
      day: 20,
      year: currentYear,
    },
    {
      name: "August 15",
      date: new Date(currentYear, 7, 15),
      month: "August",
      day: 15,
      year: currentYear,
    },
    {
      name: "September 12",
      date: new Date(currentYear, 8, 12),
      month: "September",
      day: 12,
      year: currentYear,
    },
    {
      name: "October 10",
      date: new Date(currentYear, 9, 10),
      month: "October",
      day: 10,
      year: currentYear,
    },
    {
      name: "November 7",
      date: new Date(currentYear, 10, 7),
      month: "November",
      day: 7,
      year: currentYear,
    },
    {
      name: "December 5",
      date: new Date(currentYear, 11, 5),
      month: "December",
      day: 5,
      year: currentYear,
    },
  ];
};

// Get the next upcoming cohort based on current date
export const getCurrentCohort = () => {
  const today = new Date();
  const cohorts = getCohorts();

  // Find the next upcoming cohort
  for (let cohort of cohorts) {
    if (today <= cohort.date) {
      return cohort;
    }
  }

  // If all cohorts for this year have passed, return first cohort of next year
  const nextYear = today.getFullYear() + 1;
  return {
    name: `January 15, ${nextYear}`,
    date: new Date(nextYear, 0, 15),
    month: "January",
    day: 15,
    year: nextYear,
  };
};

// Get formatted cohort date string
export const getFormattedCohortDate = () => {
  const cohort = getCurrentCohort();
  return `${cohort.month} ${cohort.day}, ${cohort.year}`;
};

// Get welcome message for new users
export const getWelcomeMessage = () => {
  const cohort = getCurrentCohort();
  return `Welcome to Enrollment Process For The ${cohort.name} My Drone Force Cohort!`;
};

// Get welcome back message for returning users (incomplete payment)
export const getWelcomeBackMessage = () => {
  const cohort = getCurrentCohort();
  return `Welcome Back! We're glad you're still considering being a part of our ${cohort.name} Cohort!`;
};

// Check if cohort is approaching (within 14 days)
export const isCohortApproaching = () => {
  const today = new Date();
  const cohort = getCurrentCohort();
  const daysLeft = Math.ceil((cohort.date - today) / (1000 * 60 * 60 * 24));
  return daysLeft <= 14 && daysLeft > 0;
};

// Get days left until cohort start
export const getDaysLeft = () => {
  const today = new Date();
  const cohort = getCurrentCohort();
  const daysLeft = Math.ceil((cohort.date - today) / (1000 * 60 * 60 * 24));
  return daysLeft > 0 ? daysLeft : 0;
};
