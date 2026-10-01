// Defining the createLoginTracker function and using userinfo parameter
function createLoginTracker(userInfo) {
  // Check that valid user information was provided
  if (
    !userInfo ||
    typeof userInfo.username !== "string" ||
    typeof userInfo.password !== "string"
  ) {
    return () => "Invalid user information";
  }

  // attemptCount belongs only to createLoginTracker.
  // The nested loginAttempt function can access it through closure
  // but it cannot be accessed directly from outside this function.
  let attemptCount = 0;

  // Nested arrow function that handles each login attempt
  const loginAttempt = (passwordAttempt) => {
    attemptCount++;

    if (attemptCount > 3) {
      return "Account locked due to too many failed login attempts";
    }

    // Check whether the entered password matches the stored password
    if (passwordAttempt === userInfo.password) {
      return "Login successful";
    }

    // If the password is incorrect and there are still attempts available,
    // return the current failed attempt number
    return `Attempt ${attemptCount}: Login failed`;
  }

  // Return the nested function so it can be used to make login attempts
  return loginAttempt;
}

// TESTING
const user = {
  username: "diana",
  password: "moringa123"
};

const tracker = createLoginTracker(user);

console.log(tracker("moringa12"));
console.log(tracker("hello123"));
console.log(tracker("moringa123"));
console.log(tracker("password123"));


module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};
