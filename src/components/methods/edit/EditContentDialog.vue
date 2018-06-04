<template>
  <v-layout>
    <v-flex>
      <v-card color="deep-purple lighten-5" class="mb-5">
        <editor id="edit-content" v-model="method.content"
                :init="{
                    plugins: 'autolink image link lists paste table',
                    menubar: '',
                    toolbar: 'undo redo | styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist indent outdent | link image | table',
                    height: 400,
                    style_formats: [
                        { title: 'Heading 1', block: 'h1' },
                        { title: 'Heading 2', block: 'h2' },
                        { title: 'Heading 3', block: 'h3' },
                        { title: 'Text', block: 'p' }
                    ],
                    statusbar: false
                }"
        ></editor>
      </v-card>
      <v-btn color="primary" @click.native="onSaveChanges">Weiter</v-btn>
      <v-btn flat @click.native="onCancel">Cancel</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    props: ['method', 'currentStep'],
    data () {
      return {
        ackMethod: null,
        editDialog: false
      }
    },
    methods: {
      onCancel () {
        this.$emit('Cancel')
      },
      onSaveChanges () {
        var hasErr = false
        if (this.method.content === '') {
          let msg = 'Die Eingabe eines Inhaltes ist Zwingend'
          this.$store.dispatch('setError', {message: msg})
          hasErr = true
        }
        if (hasErr !== true) {
          this.$store.dispatch('updateMethodeContent', {
            key: this.method.key,
            content: this.ackMethod.content
          })
          this.$emit('stepConfirm')
        }
      }
    },
    mounted: function () {
      this.ackMethod = this.method
      console.log('EditContentDialog mounted read Method ' + this.method.key)
    },
    created () {
      this.ackMethod = this.method
      console.log('EditContentDialog created read Method ' + this.method.key)
    }
  }
</script>