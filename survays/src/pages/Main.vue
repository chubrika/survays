<template>
  <div class="container">
    <div class="flex">
      <q-btn
        :ripple="{ center: true }"
        color="primary"
        label="Add new Survay"
        no-caps
        to="/add-question"
        style="margin-bottom: 20px"
      />
    </div>
    <q-table
      class="my-sticky-header-table"
      title="Survays"
      :data="rows"
      :columns="columns"
      row-key="name"
      hide-bottom
      :rows-per-page-options="[10]"
    />
  </div>
</template>

<script>
import { route } from "quasar/wrappers";
import { mapGetters, mapState } from "vuex";

export default {
  name: "PageIndex",
  data() {
    return {
      pagination: {
        rowsPerPage: 10,
      },
      columns: [
        {
          name: "number",
          label: "N",
          field: "number",
          sortable: true,
        },
        {
          name: "date",
          label: "visit date",
          field: "date",
          sortable: true,
          align: "left",
        },
        {
          name: "address",
          label: "address",
          field: "address",
          sortable: true,
          align: "left",
        },
        {
          name: "posNames",
          label: "posNames",
          field: "posNames",
          sortable: true,
          align: "left",
        },
        { name: "trade", label: "trade", field: "trade", sortable: true, align: "left" },
      ],
      rows: [],
    };
  },
  computed: {
    ...mapGetters("question", ["questionState"]),
  },
  mounted() {
    let data = [
      {
        number: "1",
        address: "Tbilisi, Agmashenebeli street, 45",
        brand: "Rocher",
        date: "2022-01-26",
        posNames: "Magnit",
        trade: "SML - 1000-2999м2-Самообслуживание",
      },
      {
        number: "2",
        address: "Kutaisi, Agmashenebeli street, 45",
        brand: "Baunt",
        date: "2022-01-26",
        posNames: "Nikora",
        trade: "SML - 200-2999м2-Самообслуживание",
      },
    ];
    this.rows = data;
  },
  watch: {
    questionState(value) {
      this.rows.push(value.questionState);
      console.log(this.rows);
    },
  },
};
</script>
