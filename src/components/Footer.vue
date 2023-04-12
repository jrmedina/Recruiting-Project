<template>
  <footer class="footer">
    <p>Joshua Medina</p>
    <a href="https://www.linkedin.com/in/joshua-medina/">
      <img src="../assets/linkedin.png" alt="" />
    </a>

    <a href="https://github.com/jrmedina/">
      <img src="../assets/github.svg" alt="" />
    </a>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
img {
  height: 25px;
  margin: 3px;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
}

p {
  margin: 0;
}
</style>
