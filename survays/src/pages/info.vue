<template>
  <div>
    <div class="flex flex-center" style="min-height: 500px">added</div>

    <div class="flex flex-center ">
      <q-btn :ripple="{ center: true }" color="secondary" label="Add new question" no-caps  to="/" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "PageInfo",
  data() {
    return {
      dense: true,
    };
  },
  methods: {
    submit() {
      console.log(this.questionState);
    },
  },
  computed: {
    ...mapState("question", ["questionState"]),
  },
};
</script>
