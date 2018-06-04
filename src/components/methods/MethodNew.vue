<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
       <v-stepper v-model="currentStep">
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 1" step="1" editable>Metadaten</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="currentStep > 2" step="2">Inhalt</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Anhänge</v-stepper-step>
        </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <app-edit-metadaten-dialog @Cancel="onCancel" @stepConfirm="onStepConfirm" :method="method" :currentStep="currentStep"></app-edit-metadaten-dialog>
            </v-stepper-content>
            <v-stepper-content step="2">
              <app-edit-content-dialog @Cancel="onCancel" @stepConfirm="onStepConfirm" :method="method" :currentStep="currentStep"></app-edit-content-dialog>
            </v-stepper-content>
            <v-stepper-content step="3">
              <app-edit-attachment-dialog @Cancel="onCancel" @saveMethode="onSaveMethode" :method="method" :currentStep="currentStep"></app-edit-attachment-dialog>
            </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      currentStep: 0,
      seminarTypes: [{ text: '-' }],
      seminarGoals: [{ text: '-' }],
      methodTypes: [{ text: '-' }],
      methodLevels: [{ text: '-' }],
      selectedSeminar: [{ text: '-' }],
      method: {
        key: '',
        name: '',
        content: '',
        seminar: '',
        typ: '',
        level: '',
        seminar_goals: '',
        attachments: []
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    error () {
      return this.$store.getters.error
    },
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
    onDismissed () {
      this.$store.dispatch('clearError')
    },
    onCancel () {
      if (this.currentStep === 1) {
        this.$router.push('/methods')
      } else {
        this.currentStep = 1
      }
    },
    onStepConfirm () {
      this.currentStep++
    },
    onSaveMethode () {
      this.$store.dispatch('createMethode')
    }
  },
  mounted: function () {
//    var store = this.$store
//    store.actions.readSeminarTypes()
    this.$store.dispatch('readSeminarTypes')
    if (this.$store.getters.seminarTypes) {
      this.seminarTypes = this.$store.getters.seminarTypes
    }
    if (this.$store.getters.seminarGoals) {
      this.seminarGoals = this.$store.getters.seminarGoals
    }
    this.$store.dispatch('readMethodTypes')
    if (this.$store.getters.methodTypes) {
      this.methodTypes = this.$store.getters.methodTypes
    }
    this.$store.dispatch('readMethodLevels')
    if (this.$store.getters.methodLevels) {
      this.methodLevels = this.$store.getters.methodLevels
    }
  },
  created () {
    this.$store.dispatch('initMethode')
    this.method = this.$store.getters.Method
  }
}
</script>
