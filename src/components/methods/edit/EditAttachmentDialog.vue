<template>
  <v-layout>
    <v-flex>
        <template v-for="item in method.attachments">
      <v-card color="deep-purple lighten-5" class="mb-5" :key="item.id">
        <editor :id="item.id" v-model="item.content"
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
        </template>
      <v-btn color="primary" @click.native="onSaveChanges">Speichern</v-btn>
      <v-btn flat @click.native="onAddAttachmen">Hinzufügen</v-btn>
      <v-btn flat @click.native="onCancel">Cancel</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    props: ['method', 'currentStep'],
    data () {
      return {
        editDialog: false
      }
    },
    methods: {
      onCancel () {
        this.$emit('Cancel')
      },
      onAddAttachmen () {
        var newAtt = {
          id: '',
          content: ''
        }
        this.method.attachments.push(newAtt)
      },
      onSaveChanges () {
        var hasErr = false
        if (this.method.attachments === '') {
          let msg = 'Die Eingabe eines Attachments ist Zwingend'
          this.$store.dispatch('setError', {message: msg})
          hasErr = true
        }
        if (hasErr !== true) {
          this.$store.dispatch('updateMethodeAttachments', {
            key: this.method.key,
            attachments: this.method.attachments
          })
          this.$emit('saveMethode')
//          this.currentStep = 3
        }
      }
    },
    created () {
// create
    }
  }
</script>