export function validateGuestData(guestData, remainingCapacity) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  switch (true) {
    case !emailRegex.test(guestData.email):
      return "Please enter a valid email address.";
    case guestData.tickets === 0 && remainingCapacity === 0:
      return "There are no tickets left.";
    case !guestData.tickets || guestData.tickets < 0:
      return "Please enter a valid number of tickets.";
    case remainingCapacity === 0:
      return "You got the last ticket!";
    default:
      return "";
  }
}
