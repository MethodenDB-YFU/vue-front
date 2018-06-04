<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h1>{{Method.name}}</h1>
          </div>
        </v-card-title>
        <v-card-text>
          <div v-html="Method.content" >
          </div>
          <div>
            <br>
            <h3>Anhänge</h3>
          </div>
          <div>
             <template v-for="item in Method.attachments">
               <hr>
              <div v-html="item.content"></div>
             </template>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="orange" @click.native="onEditMethode">Bearbeiten</v-btn>
        </v-card-actions>
      </v-card>  
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: ['id'],
  data () {
    return {
      method: {
        key: '',
        name: '',
        content: '',
        seminar: '',
        typ: '',
        level: '',
        attachments: ''
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    Method () {
      let method = this.$store.getters.Method
      return method
    }
  },
  methods: {
    onEditMethode () {
//      let path = '/method/edit/' + this.method.key
      this.$router.push({name: 'MethodEdit', params: this.method.key})
    }
  },
  mounted: function () {
    var store = this.$store
    store.dispatch('setLoading', true)
    store.dispatch('readMethod', {id: this.$route.params.id})
    store.dispatch('setLoading', false)
/*
    fetch('http://localhost:1234/api/methods/' + this.$route.params.id, {method: 'GET', headers: {'Content-Type': 'application/json', 'X-User-ID': 'aa40d8c0-e705-11e7-80c1-9a214cf093ae'}})
      .then(results => {
        return results.json()
      }).then(data => {
        let method = {
          key: data.id,
          name: data.title,
          content: data.content,
          seminar: data.seminar_type.name,
          typ: data.method_types[0].name,
          level: data.method_levels[0].name,
          attachments: data.attachments
        }
        console.log(method)
        // display loaded methods and remove loading-animation
        this.method = method
        store.dispatch('setLoading', false)
      })
      */
  }
}
</script>
