<template>
  <div class="demo g6">
    <div class="content">
      <div id="container" />
    </div>
  </div>
</template>

<script>
import G6 from '@antv/g6'

export default {
  name: 'TestG6Dagre',
  mounted() {
    const data = {
      // 节点的先后顺序与位置有关，应该从左到右，从上到下列举
      nodes: [
        { id: 'yy', name: '爷爷', layType: 'lay-1' },
        { id: 'nn', name: '奶奶', layType: 'lay-1' },
        { id: 'wg', name: '外公', layType: 'lay-1' },
        { id: 'wp', name: '外婆', layType: 'lay-1' },
        { id: 'gg', name: '姑姑', layType: 'lay-2' },
        { id: 'bb', name: '爸爸', layType: 'lay-2' },
        { id: 'mm', name: '妈妈', layType: 'lay-2' },
        { id: 'jj', name: '舅舅', layType: 'lay-2' },
        { id: 'jm', name: '舅妈', layType: 'lay-2' },
        { id: 'w', name: '我', layType: 'lay-3' },
        { id: 'qz', name: '妻子', layType: 'lay-3' },
        { id: 'bd', name: '表弟', layType: 'lay-3' },
        { id: 'nx', name: '女婿', layType: 'lay-4' },
        { id: 'ne', name: '女儿', layType: 'lay-4' },
        { id: 'ez', name: '儿子', layType: 'lay-4' },
        { id: 'ex', name: '儿媳', layType: 'lay-4' },
        { id: 'wsn', name: '外孙女', layType: 'lay-5' },
        { id: 'sz', name: '孙子', layType: 'lay-5' }
      ],
      edges: [
        { source: 'yy', target: 'gg', label: 'guanxi' },
        { source: 'yy', target: 'bb' },
        { source: 'nn', target: 'bb' },
        { source: 'nn', target: 'gg' },
        { source: 'wg', target: 'mm' },
        { source: 'wg', target: 'jj' },
        { source: 'wp', target: 'mm' },
        { source: 'wp', target: 'jj' },
        { source: 'bb', target: 'w' },
        { source: 'mm', target: 'w' },
        { source: 'jj', target: 'bd' },
        { source: 'jm', target: 'bd' },
        { source: 'w', target: 'ez' },
        { source: 'w', target: 'ne' },
        { source: 'qz', target: 'ez' },
        { source: 'qz', target: 'ne' },
        { source: 'ez', target: 'sz' },
        { source: 'ex', target: 'sz' },
        { source: 'ne', target: 'wsn' },
        { source: 'nx', target: 'wsn' }
      ]
    }

    G6.registerNode('custom-node', {
      options: {
        anchorPoints: [[0.5, 0], [0.5, 1]]
      },
      draw(cfg, group) {
        const rect = group.addShape('rect', {
          attrs: {
            x: -50,
            y: -20,
            width: 100,
            height: 40,
            radius: 10,
            stroke: '#5B8FF9',
            fill: '#C6E5FF',
            lineWidth: 3,
            cursor: 'pointer'
          },
          name: 'rect-shape'
        })
        if (cfg.name) {
          group.addShape('text', {
            attrs: {
              text: cfg.name,
              x: 0,
              y: 0,
              fill: '#00287E',
              fontSize: 14,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 'bold'
            },
            name: 'text-shape'
          })
        }
        return rect
      }
    }, 'rect')

    const container = document.getElementById('container')
    const width = container.scrollWidth
    const height = container.scrollHeight || 500
    const graph = new G6.Graph({
      container: 'container',
      width,
      height,
      layout: {
        type: 'dagre',
        nodesep: 50, // 节点间距
        ranksep: 40, // 层间距
        controlPoints: false // 是否保留布局连线的控制点
      },
      defaultNode: {
        type: 'custom-node'
      },
      defaultEdge: {
        // type: "polyline",
        type: 'line',
        style: {
          radius: 20,
          offset: 45,
          lineWidth: 2,
          stroke: '#333333'
        },
        sourceAnchor: 1,
        targetAnchor: 0
      },
      nodeStateStyles: {
        selected: {
          stroke: '#d9d9d9',
          fill: '#5394ef'
        }
      },
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'click-select'
          // {
          //     type: "tooltip",
          //     formatText(model) {
          //         const cfg = model.conf;
          //         const text = [];
          //         cfg.forEach((row) => {
          //             text.push(row.label + ":" + row.value + "<br>");
          //         });
          //         return text.join("\n");
          //     },
          //     offset: 30,
          // },
        ]
      },
      fitView: true
    })
    graph.data(data)
    graph.render()

    if (typeof window !== 'undefined') {
      window.onresize = () => {
        if (!graph || graph.get('destroyed')) return
        if (!container || !container.scrollWidth || !container.scrollHeight) return
        graph.changeSize(container.scrollWidth, container.scrollHeight)
      }
    }
  },
  methods: {}
}
</script>

<!-- <style scoped lang="stylus">
  @import "~@/common/css/common.style.styl"
  .demo
      width: 100%
      height: 100%
      .content
          width: 100%
          height "calc(100% - %s)" % commonHeight
          #container
              width: 100%
              height 100%
</style> -->
