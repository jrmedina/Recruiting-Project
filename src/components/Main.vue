<template>
  <div class="guest-list">
    <h2>Guest List</h2>
    <h3>Total Number of Guests: {{ totalGuests }}</h3>
    <table class="guests-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Number of Tickets</th>
          <th>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(guest, index) in guests" :key="index">
          <td>{{ guest.email }}</td>
          <td>
            {{ guest.tickets }}
          </td>
          <td>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const GuestRepository = require("../guest-repository");
const repo = new GuestRepository();

export default {
  data: () => {
    return {
      maxCapacity: 20,
      guests: [],
    };
  },
  async created() {
    this.guests = await repo.load();
  },
  computed: {
    totalGuests() {
      return this.guests.reduce((total, guest) => total + guest.tickets, 0);
    },
  },
};
</script>
