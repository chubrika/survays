<template>
  <div>
    <div class="flex flex-center" style="margin-top: 35px">
      <div class="size-w--full" style="padding: 10px">
        <q-form style="width: 100%" @submit="submit()">
          <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
            <q-step :name="1" title="General info" icon="settings" :done="done1">
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
                  <!-- <q-btn
                    color="primary"
                    size="md"
                    icon="add"
                    style="margin-right: 8px"
                    @click="add()"
                  /> -->
                  <div style="width: 100%">
                    <q-expansion-item
                      v-model="expanded"
                      expand-separator
                      label="Choose Brand"
                      header-class="text-purple"
                    >
                      <q-card class="flex flex-column">
                        <q-card-section style="max-height: 300px; overflow-y: auto">
                          <q-option-group
                            :options="brandOptions"
                            type="checkbox"
                            v-model="brand"
                            @input="updateBrands()"
                          />
                        </q-card-section>
                        <q-btn
                          v-if="showBtnBrand"
                          :ripple="{ center: true }"
                          color="secondary"
                          label="არჩევა"
                          no-caps
                          style="width: 200px; margin: 0 auto"
                          @click="chooseBrandOptions()"
                        />
                      </q-card>
                    </q-expansion-item>
                  </div>
                </div>

                <q-table
                  class="my-sticky-header-table mytable"
                  title="Price and Numeric Distribution"
                  :data="rows"
                  :columns="columns"
                  row-key="ID"
                  :selected-rows-label="getSelectedString"
                  selection="single"
                  :selected.sync="selected"
                  @update:selected="getSelected"
                  @selection="beforeSelection"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="check">
                        <q-checkbox
                          v-model="props.selected"
                          v-on:click.native="check(props)"
                        ></q-checkbox>
                      </q-td>
                      <q-td key="ID" :props="props"> {{ props.row.ID }} </q-td>
                      <q-td key="product" :props="props">
                        {{ props.row.product }}
                      </q-td>
                      <q-td key="shelfPrice" :props="props">
                        {{ props.row.shelfPrice }}
                        <q-popup-edit
                          v-if="props.selected"
                          v-model="props.row.shelfPrice"
                          title="Update shelfPrice"
                          buttons
                        >
                          <q-input
                            type="number"
                            v-model="props.row.shelfPrice"
                            dense
                            autofocus
                          ></q-input>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="abilityofPromo" :props="props">
                        <div class="text-pre-wrap">{{ props.row.abilityofPromo }}</div>
                        <q-popup-edit
                          v-if="props.selected"
                          v-model="props.row.abilityofPromo"
                          title="Update ability of Promo"
                          buttons
                        >
                          <q-input
                            type="number"
                            v-model="props.row.abilityofPromo"
                            dense
                            autofocus
                          ></q-input>
                        </q-popup-edit>
                      </q-td>
                      <q-td key="shelfNotPromo" :props="props">
                        <div class="text-pre-wrap">{{ props.row.shelfNotPromo }}</div>
                        <q-popup-edit
                          v-if="props.selected"
                          v-model="props.row.shelfNotPromo"
                          title="აქვს თუ არა აქციის ფასი?"
                          buttons
                        >
                          <q-option-group
                            :options="[
                              { label: 'Yes', value: 'true' },
                              {
                                label: 'No',
                                value: 'false',
                              },
                            ]"
                            type="radio"
                            v-model="props.row.shelfNotPromo"
                          />
                        </q-popup-edit>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
              <q-stepper-navigation class="footer-actions">
                <q-btn
                  @click="
                    () => {
                      done2 = true;
                      step = 3;
                    }
                  "
                  color="primary"
                  label="Continue"
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
            <q-step
              :name="3"
              title="სალაროები და ზოგადი მოწყობილობები"
              icon="settings"
              :done="done2"
            >
              <div class="group q-mb-md">
                <div class="group-title">
                  ფერეროს პროდუქციის განთავსება 70-140 სმ-ის სიმაღლეზე
                </div>
                <div class="q-pb-md">
                  <q-input
                    v-model="posCount"
                    :dense="dense"
                    filled
                    type="number"
                    label="სულ სალაროების რაოდ."
                  />
                </div>
                <div class="q-pb-md">
                  <q-input
                    v-model="posFereroCount"
                    :dense="dense"
                    filled
                    type="number"
                    label="სალაროს რაოდ. ფერეროს პროდუქციით"
                  />
                </div>
                <q-list bordered class="q-mb-md">
                  <div style="width: 100%">
                    <q-expansion-item
                      v-model="expanded"
                      expand-separator
                      label="მონიშნეთ სალაროები რომელბზეც განთავსებულია ფერეროს პროდუქცია 70-140 სმ- სიმაღლეზე"
                      header-class="text-purple"
                    >
                      <q-card class="flex flex-column">
                        <q-card-section style="max-height: 300px; overflow-y: auto">
                          <q-option-group
                            :options="posOptions"
                            type="checkbox"
                            v-model="pos"
                            @input="updatePos()"
                          />
                        </q-card-section>
                        <q-btn
                          v-if="showBtnPosOpt"
                          :ripple="{ center: true }"
                          color="secondary"
                          label="არჩევა"
                          no-caps
                          style="width: 200px; margin: 0 auto"
                          @click="choosePosOptions()"
                        />
                      </q-card>
                    </q-expansion-item>
                  </div>
                </q-list>
                <div class="q-pb-md">
                  <q-input
                    v-model="percentPos"
                    :dense="dense"
                    filled
                    type="number"
                    disable
                    label="პროცენტული რაოდენობა სალაროების რომლებზეც განთავსებულია ფერეროს პროდუქცია  70-140 სმ სიმაღლეზე"
                  />
                </div>
              </div>
              <div class="group q-mb-md">
                <div class="group-title">A+A2 ზონაში სიგანეში განლაგება</div>
                <q-list bordered>
                  <div style="width: 100%">
                    <q-expansion-item
                      expand-separator
                      label="მონიშნეთ სალაროები რომელბზეც განთავსებულია ფერეროს პროდუქცია 70-140 სმ- სიმაღლეზე"
                      header-class="text-purple"
                    >
                      <q-card class="flex flex-column">
                        <q-card-section style="max-height: 300px; overflow-y: auto">
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos1"
                              filled
                              type="number"
                              label="სალარო 1"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos2"
                              filled
                              type="number"
                              label="სალარო 2"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos3"
                              filled
                              type="number"
                              label="სალარო 3"
                              @change="posSum()"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="sumPos"
                              filled
                              disable
                              type="number"
                              label="სულ ჯამი"
                            />
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </div>
                </q-list>
              </div>
              <div class="group q-mb-md">
                <div class="group-title">B ზონაში სიგანეში განლაგება</div>
                <q-list bordered>
                  <div style="width: 100%">
                    <q-expansion-item
                      expand-separator
                      label="სიგანეზე განლაგებული პროდუქციის ზომა სმ-ში"
                      header-class="text-purple"
                    >
                      <q-card class="flex flex-column">
                        <q-card-section style="max-height: 300px; overflow-y: auto">
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos1"
                              filled
                              type="number"
                              label="სალარო 1"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos2"
                              filled
                              type="number"
                              label="სალარო 2"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos3"
                              filled
                              type="number"
                              label="სალარო 3"
                              @change="posSum()"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="sumPos"
                              filled
                              disable
                              type="number"
                              label="სულ ჯამი"
                            />
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </div>
                </q-list>
              </div>
              <div class="group q-mb-md">
                <div class="group-title">c ზონაში სიგანეში განლაგება</div>
                <q-list bordered>
                  <div style="width: 100%">
                    <q-expansion-item
                      expand-separator
                      label="სიგანეზე განლაგებული პროდუქციის ზომა სმ-ში"
                      header-class="text-purple"
                    >
                      <q-card class="flex flex-column">
                        <q-card-section style="max-height: 300px; overflow-y: auto">
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos1"
                              filled
                              type="number"
                              label="სალარო 1"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos2"
                              filled
                              type="number"
                              label="სალარო 2"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos3"
                              filled
                              type="number"
                              label="სალარო 3"
                              @change="posSum()"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="sumPos"
                              filled
                              disable
                              type="number"
                              label="სულ ჯამი"
                            />
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </div>
                </q-list>
              </div>
              <div class="group q-mb-md">
                <div class="group-title">არა სტანდარტულ ზონაში სიგანეში განლაგება</div>
                <q-list bordered>
                  <div style="width: 100%">
                    <q-expansion-item
                      expand-separator
                      label="სიგანეზე განლაგებული პროდუქციის ზომა სმ-ში"
                      header-class="text-purple"
                    >
                      <q-card class="flex flex-column">
                        <q-card-section style="max-height: 300px; overflow-y: auto">
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos1"
                              filled
                              type="number"
                              label="სალარო 1"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos2"
                              filled
                              type="number"
                              label="სალარო 2"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos3"
                              filled
                              type="number"
                              label="სალარო 3"
                              @change="posSum()"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="sumPos"
                              filled
                              disable
                              type="number"
                              label="სულ ჯამი"
                            />
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </div>
                </q-list>
              </div>
              <div class="group q-mb-md">
                <div class="group-title">
                  სალაროსთან დასაკიდ თაროზე სიგანეში განლაგება
                </div>
                <q-list bordered>
                  <div style="width: 100%">
                    <q-expansion-item
                      expand-separator
                      label="სიგანეზე განლაგებული პროდუქციის ზომა სმ-ში"
                      header-class="text-purple"
                    >
                      <q-card class="flex flex-column">
                        <q-card-section style="max-height: 300px; overflow-y: auto">
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos1"
                              filled
                              type="number"
                              label="სალარო 1"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos2"
                              filled
                              type="number"
                              label="სალარო 2"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="pos3"
                              filled
                              type="number"
                              label="სალარო 3"
                              @change="posSum()"
                            />
                          </div>
                          <div class="q-pb-md">
                            <q-input
                              :dense="dense"
                              v-model="sumPos"
                              filled
                              disable
                              type="number"
                              label="სულ ჯამი"
                            />
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </div>
                </q-list>
              </div>
              <div class="group q-mb-md">
                <div class="group-title">სულ ზომები</div>
                <div class="q-pb-md">
                  <q-input
                    :dense="dense"
                    v-model="sumPos"
                    filled
                    disable
                    type="number"
                    label="სულ სიგანეში განლაგებულის ჯამი"
                  />
                </div>
              </div>
              <q-stepper-navigation>
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
            <div class="text-h6">Add POS</div>
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
      isEditable: false,
      expanded: false,
      prompt: false,
      dense: true,
      date: "",
      brand: [],
      address: null,
      posNames: null,
      trade: null,
      product: null,
      addPosName: null,
      addPosAddress: null,
      selected: [],
      checkAll: false,
      showBtnBrand: false,
      showBtnPosOpt: false,
      posFereroCount: null,
      posCount: null,
      percentPos: null,
      pos: [],
      brandOptions: [
        { value: "1", label: "Rocher" },
        { value: "2", label: "Raffaello" },
        { value: "3", label: "Kinder Chocolate" },
        { value: "4", label: "Nutella" },
        { value: "5", label: "baunt" },
        { value: "6", label: "baunt" },
        { value: "7", label: "baunt" },
        { value: "8", label: "baunt" },
        { value: "9", label: "baunt" },
        { value: "10", label: "baunt" },
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
      posOptions: [
        { value: "1", label: "სალარო 1" },
        { value: "2", label: "სალარო 2" },
        { value: "3", label: "სალარო 3" },
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
        { name: "ID", label: "ID", field: "ID", align: "left" },
        { name: "product", label: "prdoduct", field: "product", align: "left" },
        {
          name: "abilityofPromo",
          label: "promo price",
          field: "abilityofPromo",
          sortable: true,
          align: "center",
        },
        {
          name: "shelfPrice",
          label: "shel fPrice",
          field: "shelfPrice",
          align: "center",
        },
        {
          name: "shelfNotPromo",
          label: "shelf Not Promo",
          field: "shelfNotPromo",
          align: "center",
        },
      ],
      rows: [],
      step: 1,
      done1: false,
      done2: false,
      pos1: null,
      pos2: null,
      pos3: null,
      sumPos: this.pos1 + this.pos2 + this.pos3,
    };
  },
  methods: {
    ...mapActions("question", ["setQuestionState"]),
    submit() {
      // let question = {
      //   address: this.address.label,
      //   posNames: this.posNames.label,
      //   trade: this.trade.label,
      //   date: this.date,
      //   details: this.rows,
      // };
      // console.log(question);
      // this.setQuestionState(question);
      this.$router.push("/");
    },
    addPos() {
      let i = 100;
      let pos = {
        value: ++i,
        label: this.addPosName + "-" + this.addPosAddress,
      };
      this.posNamesOptions.push(pos);
      this.prompt = false;
    },
    getSelected(newSelected) {
      // console.log(`获取selected： ${JSON.stringify(this.selected)}`)
      // console.log( `getSelected获取newSelected： ${JSON.stringify(newSelected)}`)
      this.selected = newSelected;
    },
    beforeSelection(value) {
      this.isEditable = true;
    },
    check(value) {
      console.log(value);
    },
    updateBrands() {
      console.log(this.brand);
      if (this.brand.length > 0) {
        this.showBtnBrand = true;
      } else {
        this.showBtnBrand = false;
      }
    },
    updatePos() {
      console.log(this.pos);
      if (this.pos.length > 0) {
        this.showBtnPosOpt = true;
      } else {
        this.showBtnPosOpt = false;
      }
    },
    chooseBrandOptions() {
      this.expanded = false;
    },
    choosePosOptions() {
      this.expanded = false;
      this.percentPos = (this.posOptions.length * 100) / this.posCount;
      console.log(this.percentPos);
      Math.round;
    },
    posSum() {
      this.sumPos = Number(this.pos1) + Number(this.pos2) + Number(this.pos3);
    },
    clickAllSelect(val) {
      this.checkAll = !!val;
      if (val) {
        this.data.forEach((item) => {
          this.selected.push(item);
        });
      } else {
        this.selected = [];
      }
    },
    getSelectedString() {
      return "";
    },
  },
  computed: {
    ...mapState("question", ["questionState"]),
  },
  mounted() {
    let list = [
      {
        ID: 1,
        shelfNotPromo: true,
        shelfPrice: 300,
        abilityofPromo: 200,
        product: "Roshen TOP 112",
      },
      {
        ID: 2,
        shelfNotPromo: true,
        shelfPrice: 300,
        abilityofPromo: 200,
        product: "Roshen TOP 112",
      },
      {
        ID: 3,
        shelfNotPromo: true,
        shelfPrice: 300,
        abilityofPromo: 200,
        product: "Roshen TOP 112",
      },
      {
        ID: 4,
        shelfNotPromo: true,
        shelfPrice: 300,
        abilityofPromo: 200,
        product: "Roshen TOP 112",
      },
      {
        ID: 5,
        shelfNotPromo: true,
        shelfPrice: 300,
        abilityofPromo: 200,
        product: "Roshen TOP 112",
      },
    ];
    this.rows = list;
  },
};
</script>
