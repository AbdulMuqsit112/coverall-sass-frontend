<template>
  <div class="overflow-scroll p-4 bg-white rounded-lg h-[40rem]">
    <div class="flex justify-between w-full">
      <span class="text-xl font-black">{{ title }}</span>
      <div class="flex gap-4 py-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            class="mb-4 px-4 py-1 w-[30rem] rounded-3xl bg-[#F8F8F8]"
            placeholder="Search"
          />
          <img
            src="@/assets/icons/search.svg"
            alt="search"
            class="absolute right-3 top-4 transform -translate-y-1/2"
          />
        </div>
        <button v-if="isAdd" class="bg-blue-400 text-white text-sm h-7 px-6 rounded-lg" @click="addRecord()">
          Add +
        </button>
      </div>
    </div>
    <table class="table overflow-scroll table-fixed w-full">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column"
            class="py-2 font-black text-center"
          >
            {{ computedColName(column) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" :key="item.id">
          <td v-for="column in columns" :key="column" class="px-2 text-center">
            <template v-if="isDropdownColumn(column)">
              <div class="flex justify-center">
                <select
                  v-model="item[column]"
                  :class="getDropdownClass(item[column])"
                  @change="updateRecord(item)"
                >
                  <option
                    v-for="option in getDropdownOptions(column)"
                    :key="option"
                    :value="option"
                  >
                    {{
                      option.charAt(0).toUpperCase() +
                      option.slice(1).toLowerCase()
                    }}
                  </option>
                </select>
              </div>
            </template>
            <template v-else-if="isStateColumn(column)">
              <div class="flex justify-center">
                <div :class="getDropdownClass(item[column])">
                  {{ item[column] }}
                </div>
              </div>
            </template>
            <template v-else-if="isEditableColumn(column)">
              <div class="flex justify-center">
                <input
                  ref="input"
                  v-model="item[column]"
                  class="text-xs border-none text-center bg-white w-1/2"
                  disabled
                  @blur="updateRecord(item)"
                />
                <img
                  src="@/assets/icons/pencil.svg"
                  class="cursor-pointer"
                  alt="edit"
                  @click="toggleInput($event)"
                />
              </div>
            </template>
            <template v-else>
              <span class="w-1/2 text-xs">{{ item[column] }}</span>
            </template>
          </td>
          <td v-if="isButton">
            <button
              class="px-3 py-2 text-sm my-1 rounded-lg bg-blue-400 text-white"
            >
              View
            </button>
          </td>
          <td v-if="isDelete" class="flex justify-center mt-3">
            <img
              src="@/assets/icons/bin.svg"
              alt="delete"
              class="cursor-pointer"
              @click="deleteRecord(item)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableComponent",
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    dropdownColumns: {
      type: Array,
      default: () => [],
    },
    editableColumns: {
      type: Array,
      default: () => [],
    },
    stateColumns: {
      type: Array,
      default: () => [],
    },
    isButton: {
      type: Boolean,
    },
    isDelete: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    isAdd: {
      type: Boolean,
      default: () => true,
    }
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    isDropdownColumn(column) {
      return this.dropdownColumns.includes(column);
    },
    isEditableColumn(column) {
      return this.editableColumns.includes(column);
    },
    isStateColumn(column) {
      return this.stateColumns.includes(column);
    },
    getDropdownOptions(column) {
      if (column == "subscription_status" || column == 'status') {
        return ["disabled", "enabled"];
      } else if (column === "type") {
        return ["District", "Regular"];
      } else {
        return [];
      }
    },
    toggleInput(event) {
      let input = event.target.parentNode.querySelector("input");
      input.disabled = !input.disabled;
      if (!input.disabled) {
        input.focus();
        input.addEventListener("blur", () => {
          input.disabled = true;
        });
      }
    },
    computedColName(colName) {
      switch (colName) {
        case "subscription_status":
          return "Status";
        case "subscription_date":
          return "Date";
        case "school_type":
          return "Type";
        case "full_name":
          return "Name";
        default:
          return colName.charAt(0).toUpperCase() + colName.slice(1);
      }
    },
    getDropdownClass(value) {
      if (value == "enabled") {
        return "px-2 py-2 my-1 block text-xs rounded-lg bg-green-200 text-green-500";
      } else if (value == "disabled") {
        return "px-2 py-2 my-1 block text-xs rounded-lg bg-red-100 text-red-500";
      } else {
        return "py-2 block text-xs border-none text-black";
      }
    },
    updateRecord(record) {
      this.$emit("update-record", record);
    },
    deleteRecord(record) {
      const confirmDelete = confirm(
        "Are you sure you want to delete this record?"
      );
      if (confirmDelete) {
        this.$emit("delete-record", record.id);
      }
    },
    addRecord(){
      this.$emit("add-record");
    },
  },
  computed: {
    filteredData() {
      if (this.searchQuery) {
        return this.data.filter((item) => {
          return Object.values(item).some((value) =>
            String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        });
      } else {
        return this.data;
      }
    },
  },
};
</script>

<style></style>
