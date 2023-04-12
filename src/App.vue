<style>
div.app {
  max-width: 1000px;
  margin: auto;
  font-family: sans-serif;
}

button {
  display: inline-block;
  outline: none;
  cursor: pointer;
  background-color: #fff;
  border-radius: 0.25rem;
  border: 1px solid #0070d2;
  color: #0070d2;
  font-size: 15px;
  line-height: 30px;
  margin: 5px;
}

button:hover {
  background-color: #f4f6f9;
}

input {
  margin: 5px;
  height: 20px;
}
</style>

<template>
  <div class="app">
    <NavBar />
    <br />
    <Main />
    <br />
    <Footer />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default {
  components: {
    Main,
    NavBar,
    Footer,
  },
};
</script>
