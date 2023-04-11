<template>
  <div class="modal">
    <div class="guest-form">
      <button @click="cancelUpdate()">x</button>
      <h3>{{ title }} Guest Information</h3>
      <label>Email:</label>
      <input type="email" v-model="selector.email" />
      <label>Tickets:</label>
      <input type="number" v-model.number="selector.tickets" />
      <div class="error"></div>
      <button class="submit" type="submit" @click="submitInformation()">
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
    };
  },
  props: ["title", "selector"],
  methods: {
    submitInformation() {
      if (this.title === "Edit") {
        this.$emit("update-guest", this.selector);
      } else {
        this.$emit("add-guest");
      }
      this.showModal = false;
    },

    cancelUpdate() {
      this.$emit("cancel-update");
      this.showModal = false;
    },
  },
};
</script>
<style scoped>
.guest-form {
  border: red solid 2px;
}
</style>
