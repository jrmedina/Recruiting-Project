export function validateGuestData(guestData, remainingCapacity) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  switch (true) {
    case guestData.tickets > remainingCapacity ||
      guestData.tickets + remainingCapacity - guestData.originalTickets < 0:
      return `The tickets entered exceeds the remaining capacity of ${remainingCapacity}`;

    case !guestData.tickets || guestData.tickets < 1:
      return "Please enter a valid number of tickets.";

    case !emailRegex.test(guestData.email):
      return "Please enter a valid email address.";

    default:
      return "";
  }
}
