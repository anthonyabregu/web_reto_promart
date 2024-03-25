<template>
  <div>
    <div class="ml-3 mr-3">
      <h1>Tabla de Clientes</h1>
      <table class="table table-bordered">
        <thead>
          <th>Cliente</th>
          <th>Fecha de Cumpleaños</th>
          <th>Edad</th>
          <th>Acción</th>
        </thead>
        <tbody>
          <tr v-for="item in clientes" :key="item.id">
            <td>{{ item.fullName }}</td>
            <td>{{ item.birthdate }}</td>
            <td>{{ item.age }}</td>
            <td>
              <router-link
                :to="{ path: '/cliente/' + item.id + '/edit' }"
                class="btn btn-primary mr-2"
              >
                Editar
              </router-link>

              <b-button size="sm" variant="danger" @click="showModal(item.id)">
                Eliminar
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>

      <b-pagination
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
        @change="onPageChange"
      ></b-pagination>

      <b-modal ref="myModal" :title="`Eliminar Cliente`" hide-footer>
        <p>¿Estás seguro de eliminar el cliente con ID {{ showId }}?</p>
        <div class="d-flex justify-content-end">
          <b-button variant="outline-secondary" @click="hideModal">No</b-button>
          <b-button variant="danger" @click="deleteClient(showId)">Sí</b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BModal } from "bootstrap-vue";

export default {
  components: {
    BModal,
  },
  data() {
    return {
      clientes: [],
      fields: [
        { key: "fullName", label: "Cliente" },
        { key: "birthdate", label: "Fecha de Cumpleaños" },
        { key: "age", label: "Edad" },
        { key: "action", label: "Acción" },
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      confirmDeleteToast: {
        text: "¿Estás seguro de eliminar el cliente?",
        type: "confirm",
        actionText: "Sí, eliminar",
        cancelText: "Cancelar",
      },
      showId: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const response = await axios.get(
        `${process.env.VUE_APP_API_URL}client?page=${this.currentPage}&perpage=${this.perPage}`
      );
      this.clientes = response.data.data;
      this.totalRows = response.data.total;
    },
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.fetchData();
    },

    showModal(id) {
      this.showId = id; // Almacenar el ID para mostrarlo en el modal
      this.$refs.myModal.show(); // Corregido el error tipográfico: myModal (Mayúscula M)
    },
    hideModal() {
      this.showId = null; // Reiniciar showId cuando se cierra el modal
      this.$refs.myModal.hide(); // Corregido el error tipográfico: myModal (Mayúscula M)
    },
    async deleteClient(id) {
      // Implementar la lógica para eliminar el cliente con el ID dado
      console.log("Eliminando cliente con ID", id);
      const response = await axios.delete(
        `${process.env.VUE_APP_API_URL}client/${id}`
      );

      if (response.status === 200) {
        this.$toasted.show("Cliente eliminado exitosamente", {
          type: "success",
          duration: 3000,
          position: "bottom-center",
        });
      } else {
        this.$toasted.show(`${response.data.error}`, {
          type: "error",
          duration: 3000,
          position: "bottom-center",
        });
      }

      this.fetchData();

      this.hideModal(); // Cerrar el modal después de la eliminación (opcional)
    },
  },
};
</script>
