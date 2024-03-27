<template>
  <div>
    <div class="mt-4 row justify-content-center">
      <div class="col-md-4">
        <b-card>
          <h2 class="card-header">Formulario del Cliente</h2>
          <b-card-body class="text-left">
            <b-form @submit.prevent="submitForm">
              <b-form-group>
                <b-form-input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  required
                ></b-form-input> </b-form-group
              ><br />
              <b-form-group>
                <b-form-input
                  id="surname"
                  v-model="formData.surname"
                  type="text"
                  placeholder="Ingresa tu apellido"
                  required
                ></b-form-input> </b-form-group
              ><br />
              <b-form-group>
                <b-form-input
                  id="mothers_surname"
                  v-model="formData.mothers_surname"
                  type="text"
                  placeholder="Ingresa tu apellido materno"
                ></b-form-input> </b-form-group
              ><br />
              <b-form-group>
                <b-form-input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  placeholder="Ingresa tu correo"
                  required
                ></b-form-input> </b-form-group
              ><br />
              <b-form-group>
                <b-form-datepicker
                  id="birthdate"
                  v-model="formData.birthdate"
                  type="date"
                  required
                  format="yyyy-mm-dd"
                ></b-form-datepicker> </b-form-group
              ><br />
              <b-button type="submit" variant="primary"
                >GUARDAR CLIENTE</b-button
              >
            </b-form>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosResponse, AxiosError } from "axios";

export default Vue.extend({
  name: "Home",
  components: {},

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
  created() {},
  methods: {
    async submitForm() {
      try {
        console.log(this.validate());
        if (!this.validate()) {
          this.$toasted.show(
            "Todos los campos son obligatorios, exceptuando el apellido materno",
            {
              type: "error", // Tipo de notificación: success, error, info
              duration: 3000, // Duración en milisegundos
              position: "bottom-center", // Posición de la notificación: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
            }
          );
          return;
        }

        const response: AxiosResponse = await axios.post(
          `${process.env.VUE_APP_API_URL}client`,
          this.formData
        );

        if (response.status === 200 || response.status === 201) {
          this.$toasted.show("Cliente guardado exitosamente", {
            type: "success",
            duration: 3000,
            position: "bottom-center",
          });
          console.log("OK");
          return;
        }
      } catch (error) {
        console.error(error);
        const axiosError = error as AxiosError;
        console.log("RESPONSE:", axiosError.response);
        if (axiosError.response && axiosError.response.status >= 400) {
          const errorData = axiosError.response.data as { error: string };
          this.$toasted.show(`${errorData.error}`, {
            type: "error",
            duration: 3000,
            position: "bottom-center",
          });
        } else {
          console.error(error);
          this.$toasted.show(`${error}`, {
            type: "error",
            duration: 3000,
            position: "bottom-center",
          });
        }
      }
      // You can send the data to your backend here
    },

    validate(): boolean {
      let result = true;
      if (
        this.formData.name == "" ||
        this.formData.surname == "" ||
        this.formData.email == "" ||
        this.formData.birthdate == ""
      ) {
        result = false;
      }

      return result;
    },
  },
});
</script>

<style scoped>
.card-header {
  text-align: center;
}

.card-body {
  padding: 20px;
}
</style>
