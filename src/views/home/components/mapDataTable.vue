<template>
  <div :style="styleObj">
    <Table 
      :height="height" 
      :columns="columns" 
      :data="cityData"/>
  </div>
</template>

<script>
export default {
  name: 'MapDataTable',
  data () {
    return {
      columns: [
        {
          title: '城市',
          key: 'name'
        },
        {
          title: '流量(k)',
          key: 'value',
          sortable: true
        }
      ]
    }
  },
  props: {
    cityData: Array,
    styleObj: Object,
    height: String
  }
}
</script>
