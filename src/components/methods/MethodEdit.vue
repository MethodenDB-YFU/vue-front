<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <h2>Methode Bearbeiten</h2>
    </v-flex>
  </v-layout>
  <v-layout>
    <v-flex xs12 class="text-xs-center">
      <v-progress-circular
        indeterminate
        class="primary--text"
        :width="7"
        :size="70"
        v-if="loading"></v-progress-circular>
    </v-flex>
  </v-layout>
  <v-layout v-if="!loading">
    <v-flex xs12 sm6 offset-sm3>
       <v-stepper v-model="currentStep" v-if="!loading">
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 1" step="1" editable>Metadaten</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="currentStep > 2" step="2">Inhalt</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Anhänge</v-stepper-step>
        </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <app-edit-metadaten-dialog @Cancel="onCancel" @stepConfirm="onStepConfirm" :method="Method" :currentStep="currentStep"></app-edit-metadaten-dialog>
            </v-stepper-content>
            <v-stepper-content step="2">
              <app-edit-content-dialog :method="Content" @Cancel="onCancel" @stepConfirm="onStepConfirm" :currentStep="currentStep"></app-edit-content-dialog>
            </v-stepper-content>
            <v-stepper-content step="3">
              <app-edit-attachment-dialog @Cancel="onCancel" @saveMethode="onSaveMethode" :method="Attachments" :currentStep="currentStep"></app-edit-attachment-dialog>
            </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ['id'],
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
        attachments: ''
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
    Method () {
      if (this.$store.getters.Method) {
        this.method = this.$store.getters.Method
      }
      return this.method
    },
    Content () {
      if (this.$store.getters.Method) {
        this.method = this.$store.getters.Method
      }
      return this.method
    },
    Attachments () {
      if (this.$store.getters.Method) {
        this.method = this.$store.getters.Method
      }
      return this.method
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
      this.$store.dispatch('saveMethode')
    }
  },
  mounted: function () {
    console.log('Start mounted')
    var store = this.$store
    store.dispatch('setLoading', true)
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
    if (this.$store.getters.Method.key === '' && !this.$store.getters.loading) {
      store.dispatch('readMethod', {id: this.$route.params.id})
      if (this.$store.getters.Method.key !== '' && !this.$store.getters.loading) {
        this.method = this.$store.getters.Method
        console.log('mounted read Method ' + this.method.key)
        store.dispatch('setLoading', false)
      }
    } else {
      store.dispatch('setLoading', false)
    }
  },
  created: function () {
    console.log('Start created')
/*
    var store = this.$store
    store.dispatch('setLoading', true)
    store.dispatch('readMethod', {id: this.$route.params.id})
    if (this.$store.getters.Method.key !== '' && !this.$store.getters.loading) {
      this.method = this.$store.getters.Method
      console.log('created read Method ' + this.method.key)
      store.dispatch('setLoading', false)
    }
    */
  }
}
</script>
