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
            <button @click="handleModalProps('Edit', index)">Edit</button>
            <button @click="deleteGuest(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="handleModalProps('Add')">Add Guest</button>
    <Modal
      v-if="currentModal"
      :title="currentModal"
      :selector="selectedGuest"
      @update-guest="updateGuest"
      @cancel-update="cancelUpdate"
      @add-guest="addGuest"
    />
  </div>
</template>

<script>
import Modal from "./Modal.vue";
const GuestRepository = require("../guest-repository");
const repo = new GuestRepository();

export default {
  data: () => {
    return {
      currentModal: null,
      maxCapacity: 20,
      guests: [],
      selectedGuest: null,
    };
  },
  components: { Modal },
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
    handleModalProps(title, index) {
      switch (title) {
        case "Edit":
          this.selectedGuest = { index, ...this.guests[index] };
          break;
        default:
          this.selectedGuest = { email: "", tickets: 1 };
          break;
      }
      this.currentModal = title;
    },
    // editGuest(index) {
    //   this.selectedGuest = { index, ...this.guests[index] };
    //   this.currentModal = "Edit";
    // },
    cancelUpdate() {
      this.selectedGuest = null;
      this.currentModal = null;
    },
    async addGuest() {
      if (!this.selectedGuest.email)
        return alert("Please provide an email address for the guest.");
      if (this.selectedGuest.tickets > this.remainingCapacity)
        return alert("Capacity");
      this.guests.push(this.selectedGuest);
      await repo.save(this.guests);
      this.selectedGuest = { email: "", tickets: 1 };
    },
    async deleteGuest(index) {
      this.guests.splice(index, 1);
      await repo.save(this.guests);
    },
    async updateGuest() {
      const { index, ...guest } = this.selectedGuest;
      this.guests.splice(index, 1, { ...guest });
      await repo.save(this.guests);
      this.selectedGuest = null;
      this.currentModal = null;
    },
  },
};
</script>
