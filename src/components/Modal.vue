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
