<template>
  <dialog class="modal" role="dialog" aria-modal="true">
    <div class="guest-form">
      <button @click="handleCancelUpdate" class="close" aria-label="Exit">
        x
      </button>
      <h3>{{ `${action} Guest Information` }}</h3>
      <label for="email-input">Email:</label>
      <input type="email" id="email-input" v-model="selector.email" required />
      <label for="tickets-input">Tickets:</label>
      <div class="tickets">
        <button @click="handleDecrease()" aria-label="Minus Tickets">−</button>
        <p aria-label="Number of Tickets" tabindex="0">
          {{ selector.tickets }}
        </p>
        <button
          @click="handleIncrease()"
          :disabled="isIncreaseDisabled"
          aria-label="Add Tickets"
        >
          +
        </button>
      </div>
      <p v-if="message" tabindex="0" role="alert" aria-live="assertive">
        {{ message }}
      </p>
      <button
        :disabled="!isValid"
        class="submit"
        type="submit"
        @click="submitInformation()"
      >
        Submit
      </button>
    </div>
  </dialog>
</template>

<script>
import { validateGuestData } from "../utils";

export default {
  name: "Modal",
  props: {
    action: String,
    selector: Object,
    remainingCapacity: Number,
    updateGuest: Function,
    closeModal: Function,
    addGuest: Function,
  },
  data() {
    return {
      isValid: false,
      localRemainingCapacity: this.remainingCapacity,
      message: "",
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
      switch (this.action) {
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

    handleCancelUpdate() {
      this.$emit("close-modal");
    },

    validateForm() {
      this.message = validateGuestData(
        this.selector,
        this.localRemainingCapacity
      );

      this.isValid =
        !this.message || this.message === "You got the last ticket!";
    },
  },
};
</script>

<style scoped>
.tickets {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.tickets button {
  padding: 7px;
  font-size: larger;
  font-weight: bold;
  margin: 10px;
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
