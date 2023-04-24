<template>
  <main class="guest-list" tabindex="0">
    <h2>Guest List</h2>
    <h3>
      Capacity: {{ maxCapacity }}<br />
      Total Number of Guests: {{ totalGuests }}
    </h3>
    <p class="message" v-if="message" role="alert" aria-live="assertive">
      {{ message }}
    </p>
    <table class="guests-table">
      <thead>
        <tr>
          <th scope="col">Email</th>
          <th scope="col">Number of Tickets</th>
          <th scope="col">Actions</th>
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
    <p
      class="message"
      v-if="isCapacityReached"
      role="alert"
      aria-live="assertive"
    >
      You are at capacity.
    </p>
    <button @click="handleModalProps('Add')" :disabled="isCapacityReached">
      Add Guest
    </button>

    <Modal
      v-if="currentModal"
      :action="currentModal"
      :guest="selectedGuest"
      :remaining-capacity="getRemainingCapacity()"
      @update-guest="updateGuest"
      @close-modal="closeModal"
      @add-guest="addGuest"
    />
  </main>
</template>

<script>
import Modal from "./Modal.vue";
import GuestRepository from "../guest-repository";
import Guest from "../classes/guest"
const repo = new GuestRepository();


export default {
  data() {
    return {
      currentModal: null,
      selectedGuest: null,
      maxCapacity: 20,
      guests: [],
      message: "",
    };
  },
  async created() {
    const data = await repo.load()
    this.guests = data.map(guest => new Guest(guest.email, guest.tickets));


  },
  computed: {
    totalGuests() {
      return this.guests.reduce((total, guest) => total + guest.tickets, 0);
    },

    isCapacityReached() {
      return this.totalGuests === this.maxCapacity;
    },
  },
  methods: {
    getRemainingCapacity() {
      return this.maxCapacity - this.totalGuests;
    },

    handleModalProps(action, index) {
      switch (action) {
        case "Edit":
          this.selectedGuest = { index, ...this.guests[index] };
          break;
        case "Add":
          this.selectedGuest = new Guest('', 0);
          break;
        default:
          break;
      }
      this.currentModal = action;
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
