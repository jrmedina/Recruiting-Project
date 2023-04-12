<template>
  <div class="modal">
    <div class="guest-form">
      <button @click="cancelUpdate" class="close">x</button>
      <h3>{{ `${title} Guest Information` }}</h3>
      <label>Email:</label>
      <input type="email" v-model="selector.email" />
      <label>Tickets:</label>
      <div class="tickets">
        <button @click="handleDecrease()">−</button>
        <p>{{ selector.tickets }}</p>
        <button @click="handleIncrease()" :disabled="isIncreaseDisabled">
          +
        </button>
      </div>
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
import { validateGuestData } from "../utils";

export default {
  name: "Modal",
  props: ["title", "selector", "remainingCapacity"],
  data() {
    return {
      isValid: false,
      localRemainingCapacity: this.remainingCapacity,
      errorMsg: "",
    };
  },
  computed: {
    isIncreaseDisabled() {
      return this.localRemainingCapacity === 0;
    },
  },

  watch: {
    "selector.email": function() {
      this.validateForm();
    },
    "selector.tickets": function() {
      this.validateForm();
    },
  },
  methods: {
    handleDecrease() {
      this.selector.tickets--;
      this.localRemainingCapacity++;
    },
    handleIncrease() {
      this.selector.tickets++;
      this.localRemainingCapacity--;
    },
    submitInformation() {
      switch (this.title) {
        case "Edit":
          this.$emit("update-guest", this.selector);
          break;
        case "Add":
          this.$emit("add-guest");
          break;
        default:
          break;
      }
    },

    cancelUpdate() {
      this.$emit("cancel-update");
    },
    validateForm() {
      this.errorMsg = validateGuestData(
        this.selector,
        this.localRemainingCapacity
      );
      this.isValid =
        !this.errorMsg || this.errorMsg === "You got the last ticket!";
    },
  },
};
</script>
<style scoped>
.tickets {
  display: flex;
  justify-content: center;
  font-weight: bold;
}
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
.close {
  align-self: flex-end;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: crimson;
  margin: 5px;
  background-color: #fff;
  border-radius: 0.25rem;
  border: 1px solid crimson;
  width: 40px;
}

.close:hover {
  color: white;
  background-color: crimson;
}

.submit {
  align-self: center;
  width: 50%;
}
</style>
