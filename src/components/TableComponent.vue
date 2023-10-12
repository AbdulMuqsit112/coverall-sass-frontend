<template>
  <div class="overflow-x-auto w-full p-6 bg-white">
    <table class="table w-full table-fixed">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column" class="px-6 py-2 font-black text-left">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td v-for="column in columns" :key="column" class="px-6">
            <template v-if="isDropdownColumn(column)">
              <select v-model="item[column]" :class="getDropdownClass(item[column])">
                <option v-for="option in getDropdownOptions(column)" :key="option">{{ option }}</option>
              </select>
            </template>
            <template v-else-if="isEditableColumn(column)">
              <div class="flex justify-center">
                <input ref="input" v-model="item[column]" class="text-xs border-none text-center bg-white w-fit" disabled>
                <img src="@/assets/icons/pencil.svg" class="cursor-pointer" alt="edit" @click="toggleInput($event)">
              </div>
            </template>
            <template v-else>
              <span>{{ item[column] }}</span>
            </template>
          </td>
          <td v-if="isButton">
            <button class="px-3 py-2 text-sm my-1 rounded-lg bg-blue-400 text-white">View</button>
          </td>
          <td>
            <img src="@/assets/icons/bin.svg" alt="delete">
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
    isButton: {
      type: Boolean,
    },
  },
  methods: {
    isDropdownColumn(column) {
      return this.dropdownColumns.includes(column);
    },
    isEditableColumn(column) {
      return this.editableColumns.includes(column);
    },
    getDropdownClass(value) {
      if (value === "Approved") {
        return "px-2 py-2 block text-xs rounded-lg bg-green-200 text-green-500";
      } else if (value === "Denied") {
        return "px-2 py-2 block text-xs rounded-lg bg-red-100 text-red-500";
      } else if (value === "waiting") {
        return "px-2 py-2 block text-xs rounded-lg bg-gray-200 text-gray-400";
      } else {
        return "py-2 block text-xs border-none text-black";
      }
    },
    getDropdownOptions(column) {
      if (column === "status") {
        return ["Approved", "Denied", "waiting"];
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
  },
};
</script>

<style scoped>
</style>
