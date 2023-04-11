<template>
  <div class="modal">
    <div class="guest-form">
      <button @click="cancelUpdate()">x</button>
      <h3>{{ title }} Guest Information</h3>
      <label>Email:</label>
      <input type="email" v-model="selector.email" />
      <label>Tickets:</label>
      <input type="number" v-model.number="selector.tickets" />
      <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
      <button
        :disabled="!isValid"
        class="submit"
        type="submit"
        @click="submitInformation()"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      showModal: false,
      isValid: false,

      errorMsg: "",
    };
  },
  props: ["title", "selector", "remainingCapacity"],
  watch: {
    "selector.email": function() {
      this.validateForm();
    },
    "selector.tickets": function() {
      this.validateForm();
    },
  },
  methods: {
    submitInformation() {
      switch (this.title) {
        case "Edit":
          this.$emit("update-guest", this.selector);
          break;
        case "Add":
          this.$emit("add-guest");
          break;
        default:
          this.showModal = false;
          break;
      }
    },

    cancelUpdate() {
      this.$emit("cancel-update");
      this.showModal = false;
    },
    validateForm() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let errorMessage = "";
      let isValid = true;

      switch (true) {
        case !emailRegex.test(this.selector.email):
          errorMessage = "Please enter a valid email address.";
          isValid = false;
          break;
        case !this.selector.tickets || this.selector.tickets < 1:
          errorMessage = "Please enter a valid number of tickets.";
          isValid = false;
          break;
        case this.selector.tickets > this.remainingCapacity:
          errorMessage = `The tickets entered exceeds the remaining capacity of ${this.remainingCapacity}`;
          isValid = false;
          break;
        default:
          errorMessage = "";
          isValid = true;
          break;
      }
      this.isValid = isValid;
      this.errorMsg = errorMessage;
    },
  },
};
</script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.guest-form {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  height: 40%;
  width: 250px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}
</style>
