<template>
  <div>
    <div class="flex flex-center" style="min-height: 500px">
      <div class="size-w--full" style="padding: 10px">
        <q-form style="width: 100%" @submit="submit()">
          <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
            <q-step :name="1" title="General info" icon="settings" :done="done1">
              <div class="q-pb-sm">
                <q-select
                  filled
                  v-model="brand"
                  :options="brandOptions"
                  label="Choose Brand"
                  :dense="dense"
                  value=""
                />
              </div>
              <!-- <div class="q-pb-sm">
                <q-select
                  filled
                  v-model="address"
                  :options="addressOptions"
                  label="POS Address"
                  :dense="dense"
                  value=""
                />
              </div> -->
              <div class="q-pb-sm">
                <q-select
                  filled
                  bottom-slots
                  v-model="posNames"
                  :options="posNamesOptions"
                  label="POS Name"
                  :dense="dense"
                  value=""
                >
                  <template v-slot:append>
                    <q-btn round dense flat icon="add" @click="prompt = true" />
                  </template>
                </q-select>
              </div>
              <div class="q-pb-sm">
                <q-select
                  filled
                  v-model="trade"
                  :options="tradeOptions"
                  label="Trade channel"
                  :dense="dense"
                  value=""
                />
              </div>
              <div class="q-pb-lg">
                <q-input
                  v-model="date"
                  :dense="dense"
                  filled
                  type="date"
                  hint="Date of visit"
                />
              </div>
              <q-stepper-navigation>
                <q-btn
                  @click="
                    () => {
                      done1 = true;
                      step = 2;
                    }
                  "
                  color="primary"
                  label="Continue"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="2"
              title="Prices"
              caption="Optional"
              icon="create_new_folder"
              :done="done2"
            >
              <div class="">
                <div class="filter-section">
                  <q-btn
                    color="primary"
                    size="md"
                    icon="add"
                    style="margin-right: 8px"
                    @click="add()"
                  />
                  <div style="width: 150px">
                    <q-select
                      filled
                      v-model="brand"
                      :options="brandOptions"
                      label="Choose Brand"
                      :dense="dense"
                      value=""
                    />
                  </div>
                </div>
                <div class="add-question" v-if="addMode">
                  <div class="q-pb-lg flex flex-column flex-a--center">
                    Ability of promo price
                    <div class="flex flex-center q-pt-sm">
                      <q-radio
                        dense
                        v-model="abilityofPromo"
                        val="true"
                        label="Yes"
                        class="q-pr-md"
                      />
                      <q-radio dense v-model="abilityofPromo" val="false" label="No" />
                    </div>
                  </div>
                  <div class="q-pb-sm">
                    <q-select
                      filled
                      v-model="product"
                      :options="productOptions"
                      label="Product Name"
                      :dense="dense"
                      value=""
                    />
                  </div>
                  <div class="q-pb-sm">
                    <q-input
                      type="number"
                      dense
                      filled
                      v-model="shelfPrice"
                      label="Shelf price in local currency"
                    />
                  </div>
                  <div class="q-pb-md">
                    <q-input
                      type="number"
                      dense
                      filled
                      v-model="shelfNotPromo"
                      label="Shelf not promo price in local currency"
                    />
                  </div>
                  <q-btn
                    color="secondary"
                    size="sm"
                    label="save added Question"
                    style="margin-bottom: 15px"
                    @click="saveAddedQuestion()"
                  />
                </div>
                <q-table
                  class="my-sticky-header-table mytable"
                  title="Price and Numeric Distribution"
                  :data="rows"
                  :columns="columns"
                  row-key="name"
                  hide-bottom
                  :rows-per-page-options="[10]"
                />
              </div>
              <q-stepper-navigation class="footer-actions">
                <q-btn
                  type="submit"
                  :ripple="{ center: true }"
                  color="secondary"
                  label="Save Data"
                  no-caps
                />
                <q-btn
                  flat
                  @click="
                    () => {
                      step = 1;
                    }
                  "
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </q-form>
      </div>
    </div>
    <div>
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Add POS Address</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              label="POS Name"
              filled
              :dense="dense"
              v-model="addPosName"
              autofocus
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input label="POS Address" filled :dense="dense" v-model="addPosAddress" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Add" @click="addPos()" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { route } from "quasar/wrappers";
import { mapActions, mapState } from "vuex";

export default {
  name: "AddQuestions",
  data() {
    return {
      addMode: false,
      prompt: false,
      dense: true,
      date: "",
      brand: null,
      address: null,
      posNames: null,
      trade: null,
      product: null,
      addPosName: null,
      addPosAddress: null,
      brandOptions: [
        { value: "1", label: "Rocher" },
        { value: "2", label: "Raffaello" },
        { value: "3", label: "Kinder Chocolate" },
      ],
      posNamesOptions: [
        { value: "1", label: "Magnit-Tbilisi, Agmashenebeli street, 45" },
        { value: "2", label: "Nikora-Tbilisi, Agmashenebeli street, 45" },
        { value: "3", label: "Fresco-Tbilisi, Tamar Mephe street, 7" },
      ],
      tradeOptions: [
        { value: "1", label: "SML - 1000-2999м2-Самообслуживание" },
        { value: "2", label: "SML - 1000-2999м2-Самообслуживание" },
        { value: "3", label: "SML - 1000-2999м2-Самообслуживание" },
      ],
      productOptions: [
        { value: "1", label: "SKU Rocher T11" },
        { value: "2", label: "SKU Rocher T12" },
        { value: "3", label: "SKU Rocher T13" },
      ],
      abilitySKU: null,
      abilityBrand: null,
      shelfPrice: "",
      abilityofPromo: null,
      shelfNotPromo: "",
      pagination: {
        rowsPerPage: 10,
      },
      columns: [
        { name: "product", label: "prdoduct", field: "product" },
        {
          name: "abilityofPromo",
          label: "promo price",
          field: "abilityofPromo",
          sortable: true,
        },
        { name: "shelfPrice", label: "shel fPrice", field: "shelfPrice" },
        { name: "shelfNotPromo", label: "shelf Not Promo", field: "shelfNotPromo" },
      ],
      rows: [],
      step: 1,
      done1: false,
      done2: false,
    };
  },
  methods: {
    ...mapActions("question", ["setQuestionState"]),
    submit() {
      let question = {
        brand: this.brand.label,
        address: this.address.label,
        posNames: this.posNames.label,
        trade: this.trade.label,
        date: this.date,
        details: this.rows,
      };
      console.log(question);
      this.setQuestionState(question);
      this.$router.push("/");
    },
    add() {
      this.addMode = true;
    },
    addPos() {
      let i = 100;
      let pos = {
        value: ++i,
        label: this.addPosName + "-" + this.addPosAddress,
      };
      this.posNamesOptions.push(pos);
      this.$emit("close");
    },
    saveAddedQuestion() {
      let details = {
        shelfNotPromo: this.shelfNotPromo,
        shelfPrice: this.shelfPrice,
        abilityofPromo: this.abilityofPromo,
        product: this.product.label,
      };
      this.addMode = false;
      this.rows.push(details);
      console.log(details);
    },
  },
  computed: {
    ...mapState("question", ["questionState"]),
  },
};
</script>
