<template>
  <div class="guest-list">
    <h2>Guest List</h2>
    <h3>
      Capacity: {{ maxCapacity }}<br />
      Total Number of Guests: {{ totalGuests }}
    </h3>
    <div class="message" v-if="message">{{ message }}</div>
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
      :remaining-capacity="getRemainingCapacity()"
      @update-guest="updateGuest"
      @close-modal="closeModal"
      @add-guest="addGuest"
    />
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import GuestRepository from "../guest-repository";
const repo = new GuestRepository();

export default {
  data() {
    return {
      currentModal: null,
      maxCapacity: 20,
      guests: [],
      selectedGuest: null,
      message: "",
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
  methods: {
    getRemainingCapacity() {
      return this.maxCapacity - this.totalGuests;
    },
    handleModalProps(title, index) {
      switch (title) {
        case "Edit":
          this.selectedGuest = { index, ...this.guests[index] };
          break;
        case "Add":
          this.selectedGuest = { email: "", tickets: 0 };
          break;
        default:
          break;
      }
      this.currentModal = title;
    },

    closeModal() {
      this.selectedGuest = null;
      this.currentModal = null;
    },
    async addGuest() {
      this.guests.push(this.selectedGuest);
      await repo.save(this.guests);
      this.closeModal();
      this.handleMessage("Guest has been added!");
    },
    async deleteGuest(index) {
      this.guests.splice(index, 1);
      await repo.save(this.guests);
      this.handleMessage("Guest has been deleted!");
    },
    async updateGuest() {
      const { index, ...guest } = this.selectedGuest;
      this.guests.splice(index, 1, { ...guest });
      await repo.save(this.guests);
      this.closeModal();
      this.handleMessage("Guest has been updated!");
    },
    handleMessage(msgToBeDisplayed) {
      this.message = msgToBeDisplayed;
      setTimeout(() => {
        this.message = "";
      }, 3000);
    },
  },
  components: { Modal },
};
</script>

<style scoped>
.message {
  color: green;
  font-weight: bold;
}
.guest-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.guests-table {
  width: 50%;
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
td {
  text-align: center;
}
th {
  text-decoration: underline;
}
</style>
