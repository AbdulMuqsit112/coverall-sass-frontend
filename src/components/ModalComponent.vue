<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-opacity-80 backdrop-filter backdrop-blur-md"
  >
    <div class="modal bg-white shadow-lg rounded-lg w-[30rem]">
      <div class="modal-content">
        <h2
          class="modal-title text-2xl text-center font-bold py-4 border-b border-gray-200"
        >
          {{ title }}
        </h2>
        <form @submit.prevent="submitForm">
          <div class="modal-body p-4">
            <!-- Render input fields -->
            <div class="flex flex-wrap">
              <div
                v-for="field in inputFields"
                :key="field.id"
                class="mb-4 ml-4 flex items-center"
              >
                <label
                  class="block mb-2 mr-2 w-32"
                  :style="{ width: field.labelWidth + 'px' }"
                  >{{ field.label }}</label
                >
                <input
                  :type="field.type || 'text'"
                  v-model="field.value"
                  class="bg-[#f8f8f8] rounded-md px-2 py-1 w-64"
                />
              </div>
            </div>

            <!-- Render Text Area fields -->
            <div class="">
              <div
                v-for="field in textAreaFields"
                :key="field.id"
                class="mb-4 gap-6 flex items-center"
              >
                <label class="mt-4">{{ field.label }}</label>
                <textarea
                  v-model="field.value"
                  class="bg-[#f8f8f8] rounded-md px-2 py-1 w-64"
                ></textarea>
              </div>
            </div>

            <!-- Render radio buttons and dropdowns -->
            <div class="">
              <div
                v-for="radioGroup in radioButtons"
                :key="radioGroup.id"
                class="mb-4"
              >
                <span class="mb-2">{{ radioGroup.label }}</span>
                <div class="flex gap-4">
                  <div
                    v-for="option in radioGroup.options"
                    :key="option.value"
                    class="flex"
                  >
                    <input
                      type="radio"
                      v-model="radioGroup.selectedOption"
                      :value="option.value"
                      class="mr-2 font-black"
                    />
                    <label>{{ option.label }}</label>
                  </div>
                </div>
              </div>

              <div
                v-for="dropdown in dropdownOptions"
                :key="dropdown.id"
                class="mb-4 ml-4 flex items-center"
              >
                <label class="mb-2 mr-2 w-32">{{ dropdown.label }}</label>
                <select
                  v-model="dropdown.selectedOption"
                  class="border border-black rounded px-6 py-1"
                  @change="checkConditional(dropdown.selectedOption)"
                >
                  <option
                    v-for="option in dropdown.options"
                    :key="option"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>

              <div
                v-for="dropdown in conditionalDropdowns"
                :key="dropdown.id"
                class="mb-4 ml-4 gap-6 flex items-center"
              >
                <label class="mb-2 w-32">{{ dropdown.label }}</label>
                <select
                  v-model="dropdown.selectedOption"
                  class="border border-black rounded px-6 py-1"
                >
                  <option
                    v-for="option in dropdown.options"
                    :key="option"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div
            class="modal-footer flex justify-between p-4 border-t border-gray-200"
          >
            <button
              @click="closeModal"
              class="bg-[#ED9292] hover:bg-[#e7585d] text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputFields: {
      type: Array,
      default: () => [],
    },
    textAreaFields: {
      type: Array,
      default: () => [],
    },
    radioButtons: {
      type: Array,
      default: () => [],
    },
    dropdownOptions: {
      type: Array,
      default: () => [],
    },
    conditionalDropdowns: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: () => "NO TITLE",
    },
    isConditional: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    submitForm() {
      let formData = {};
      let hasEmptyFields = false;

      if (this.inputFields.length > 0) {
        let inputFieldData = this.inputFields.reduce((result, item) => {
          if (item.value.trim() === "") {
            hasEmptyFields = true;
          }
          result[item.label] = item.value;
          return result;
        }, {});
        formData = { ...inputFieldData };
      }
      if (this.textAreaFields.length > 0) {
        let textAreaData = this.textAreaFields.reduce((result, item) => {
          result[item.label] = item.value;
          return result;
        }, {});
        formData = {
          ...formData,
          ...textAreaData,
        };
      }
      if (this.dropdownOptions.length > 0) {
        let dropDownData = this.dropdownOptions.map((obj) => {
          const label = obj.label;
          const selectedOption = obj.selectedOption;

          return { label, selectedOption };
        });
        formData = {
          ...formData,
          dropDownData,
        };
      }
      if (this.conditionalDropdowns.length > 0) {
        let condDropdown = this.conditionalDropdowns.map((obj) => {
          const label = obj.label;
          const selectedOption = obj.selectedOption;

          return { label, selectedOption };
        });
        formData = {
          ...formData,
          condDropdown,
        };
      }
      if (hasEmptyFields) {
        console.log("Please fill in all the fields");
        return;
      }
      this.$emit("submited-data", formData);
      this.resetFields();
    },
    checkConditional(opt) {
      if (this.isConditional) {
        this.$emit("add-dropdown", opt);
      }
    },
    resetFields() {
      this.inputFields.forEach((field) => {
        field.value = "";
      });
      this.textAreaFields.forEach((field) => {
        field.value = "";
      });

      this.radioButtons.forEach((radioGroup) => {
        radioGroup.selectedOption = "";
      });

      this.dropdownOptions.forEach((dropdown) => {
        dropdown.selectedOption = "";
      });
    },
    closeModal() {
      this.$emit("close-modal");
      this.resetFields();
    },
  },
};
</script>

<style scoped>
/* Add your custom styles for the modal here */
</style>
