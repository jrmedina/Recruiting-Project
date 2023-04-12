export function validateGuestData(guestData, remainingCapacity) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(guestData.email)) {
    return "Please enter a valid email address.";
  }

  if (guestData.tickets === 0 && remainingCapacity === 0) {
    return "There are no tickets left.";
  }

  if (!guestData.tickets || guestData.tickets < 0) {
    return "Please enter a valid number of tickets.";
  }

  if (remainingCapacity === 0) {
    return "You got the last ticket!";
  }
}
