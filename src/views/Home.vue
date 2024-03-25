<template>
  <div>
    <Carousel />
  </div>
</template>

<script>
import Vue from "vue";
import Carousel from "@/components/Carousel.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Carousel,
  },

  data() {
    return {
      formData: {
        name: "",
        surname: "",
        mothers_surname: "",
        email: "",
        birthdate: "",
      },
    };
  },
});
</script>

<style scoped></style>
