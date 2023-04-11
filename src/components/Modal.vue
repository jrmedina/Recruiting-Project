<template>
  <form class="modal">
    <div class="guest-form">
      <button>x</button>
      <h3>Guest Information</h3>
      <label>Email:</label>
      <input type="email" />
      <label>Tickets:</label>
      <input type="number" />
      <div class="error"></div>
      <button class="submit" type="submit">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {};
  },
};
</script>
