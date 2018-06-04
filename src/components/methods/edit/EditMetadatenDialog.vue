<template>
  <v-layout>
    <v-flex>
      <v-card class="mb-5">
        <v-text-field v-model="method.name"
            label="Name"
            :rules="[v => !!v || 'Name is required']"
            required
          ></v-text-field>
          <v-select
            v-model="method.seminar"
            :items="SeminarTypes"
            :rules="[v => !!v || 'Seminar is required']"
            label="Seminar"
            required
          ></v-select>
          <v-select
            v-model="method.method_types"
            :items="MethodTypes"
            :rules="[v => !!v || 'Typ is required']"
            label="Typ"
            multiple
            required
          ></v-select>
          <v-select
            v-model="method.method_levels"
            :items="MethodLevels"
            :rules="[v => !!v || 'level is required']"
            label="Level"
            multiple
            required
          ></v-select>
          <v-select v-if="method.seminar !== ''"
            v-model="method.seminar_goals"
            :items="SeminarGoals"
            :rules="[v => !!v || 'level is required']"
            label="Seminarziele"
            multiple
          ></v-select>
      </v-card>
      <v-btn color="primary" @click.native="onSaveChanges">Weiter</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    props: ['method', 'currentStep'],
    data () {
      return {
        ackMethod: null,
        editDialog: false,
        seminarTypes: [{ text: '-' }],
        seminarGoals: [{ text: '-' }],
        methodTypes: [{ text: '-' }],
        methodLevels: [{ text: '-' }],
        selectedSeminar: [{ text: '-' }]
      }
    },
    computed: {
      SeminarTypes () {
        if (this.$store.getters.seminarTypes) {
          this.seminarTypes = this.$store.getters.seminarTypes
        }
        return this.seminarTypes
      },
      SeminarGoals () {
        if (this.$store.getters.seminarGoals) {
          this.seminarGoals = this.$store.getters.seminarGoals
        }
        return this.seminarGoals
      },
      MethodTypes () {
        if (this.$store.getters.methodTypes) {
          this.methodTypes = this.$store.getters.methodTypes
        }
        return this.methodTypes
      },
      MethodLevels () {
        if (this.$store.getters.methodLevels) {
          this.methodLevels = this.$store.getters.methodLevels
        }
        return this.methodLevels
      }
    },
    methods: {
      onSaveChanges () {
        var hasErr = false
        if (this.method.name === '') {
          let msg = 'Die Eingabe eines Namen ist Zwingend'
          this.$store.dispatch('setError', {message: msg})
          hasErr = true
        }
        if (this.method.method_types === '') {
          let msg = 'Die Auswahl eines Typs ist Zwingend'
          this.$store.dispatch('setError', {message: msg})
          hasErr = true
        }
        if (this.method.method_levels === '') {
          let msg = 'Die Auswahl eines Levels ist Zwingend'
          this.$store.dispatch('setError', {message: msg})
          hasErr = true
        }
        if (hasErr !== true) {
          this.$store.dispatch('updateMethodeMeta', {
            key: this.method.key,
            name: this.method.name,
            seminar: this.method.seminar,
            typ: this.method.typ,
            level: this.method.level,
            seminar_goals: this.method.seminar_goals
          })
//          this.currentStep = 2
          this.$emit('stepConfirm')
        }
      }
    },
    mounted: function () {
      this.ackMethod = this.method
      console.log('EditMetadatenDialog mounted read Method ' + this.ackMethod.key)
    },
    created () {
      this.ackMethod = this.method
      console.log('EditMetadatenDialog created read Method ' + this.ackMethod.key)
// create
    }

  }
</script>
