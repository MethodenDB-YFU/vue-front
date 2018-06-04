<template>
  <v-container>
  <v-card>
    <v-card-title>
      <h3>Methoden</h3>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn absolut bottom right fab dark color="primary" :to="'/method/new'">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="methods"
      :search="search"
      :loading="tableLoading"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>
          <router-link tag="span" style="cursor: pointer" v-bind:to="{ name: 'MethodDetails', params: {id: props.item.key }}">{{ props.item.name }}</router-link>
        </td>
        <td>{{ props.item.seminar }}</td>
        <td>{{ props.item.typ }}</td>
        <td>{{ props.item.level }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
  </v-container>
</template>  
<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: true,
            value: 'name'
          },
          { text: 'Seminar', value: 'seminar' },
          { text: 'Typ', value: 'typ' },
          { text: 'Level', value: 'level' }
        ],
        methods: [],
        tableLoading: true
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    mounted: function () {
      fetch('http://localhost:1234/api/methods')
          .then(results => {
            return results.json()
          }).then(data => {
            let methods = data.map((method) => {
              let methodJson = {
                key: method.id,
                name: method.title,
                seminar: method.seminar_type.name,
                typ: method.method_types[0].name,
                level: method.method_levels[0].name
              }
              return methodJson
            })
                              // display loaded methods and remove loading-animation
            this.methods = methods
            this.tableLoading = false
          })
    },
    created: function () {
      this.tableLoading = true
    }
  }
</script>