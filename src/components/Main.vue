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
            <button @click="editGuest(index)">Edit</button>
            <button @click="deleteGuest(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <form v-if="selectedGuest !== null">
      <h4>Edit Guest Information</h4>
      <label>Email:</label>
      <input type="email" v-model="selectedGuest.email" />
      <label>Tickets:</label>
      <input type="number" v-model="selectedGuest.tickets" />
      <button @click.prevent="updateGuest()">Update</button>
      <button @click.prevent="cancelUpdate()">Cancel</button>
    </form>
    <form>
      <h4>Add Guest Information</h4>
      <label>Email:</label>
      <input type="email" v-model="newGuest.email" />
      <label>Tickets:</label>
      <input type="number" v-model="newGuest.tickets" />
      <button @click.prevent="addGuest()">Add Guest</button>
      <button>Cancel</button>
    </form>
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
      selectedGuest: null,
      newGuest: {
        email: "",
        tickets: 1,
      },
    };
  },
  async created() {
    this.guests = await repo.load();
  },
  computed: {
    totalGuests() {
      return this.guests.reduce((total, guest) => total + guest.tickets, 0);
    },
    remainingCapacity() {
      return this.maxCapacity - this.totalGuests;
    },
  },
  methods: {
    editGuest(index) {
      this.selectedGuest = { index, ...this.guests[index] };
    },
    cancelUpdate() {
      this.selectedGuest = null;
    },
    async addGuest() {
      if (!this.newGuest.email)
        return alert("Please provide an email address for the guest.");
      if (this.newGuest.tickets > this.remainingCapacity)
        return alert("Capacity");
      this.guests.push(this.newGuest);
      await repo.save(this.guests);
      this.newGuest = { email: "", tickets: 1 };
    },
    async deleteGuest(index) {
      this.guests.splice(index, 1);
      await repo.save(this.guests);
    },
    async updateGuest() {
      const index = this.selectedGuest.index;
      const { email, tickets } = this.selectedGuest;
      if (tickets > this.remainingCapacity) return alert("Capacity");
      this.guests.splice(index, 1, { email: email, tickets: Number(tickets) });
      await repo.save(this.guests);
      this.selectedGuest = null;
    },
  },
};
</script>
