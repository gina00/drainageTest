<template>
  <div>
    <div id="drawGraph" />
  </div>
</template>

<script>
let graphG = null
import G6 from '@antv/g6'
export default {
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      const combos = [
        { id: '100-600', label: '100-600' },
        { id: '100-200', label: '100-200' },
        { id: '200-300', label: '200-300' },
        { id: '300-400', label: '300-400' },
        { id: '400-500', label: '400-500' },
        { id: '500-600', label: '500-600' }
      ]
      const edges = [
        { source: '100-600', target: '100-200' },
        { source: '100-600', target: '200-300' },
        { source: '100-600', target: '300-400' },
        { source: '100-600', target: '400-500' },
        { source: '100-600', target: '500-600' }
      ]
      // 生成(20-30)随机数 模拟节点node
      const randomCount = Math.floor(Math.random() * 10) + 20
      const row_clo = Math.floor(Math.sqrt(randomCount))
      const origin = [-150, 50]; const row = 110; const clo = 150
      const nodes = []
      for (let i = 0; i < randomCount; i++) {
        const randomNum = String(Math.floor(Math.random() * 500) + 100) // 生成100-600之间的随机数，并与combo进行连线
        const rowindex = Math.floor(i / row_clo)
        const cloindex = i % row_clo
        const x = origin[0] + clo * cloindex
        const y = origin[1] + row * rowindex
        const node = {
          label: randomNum,
          id: randomNum,
          x,
          y,
          style: {
            fillOpacity: 0.5,
            cursor: 'pointer',
            fill: randomNum % 5 == 0 ? '#81C7D4' : '#986DB2'
          }
        }
        const index = Math.floor(randomNum / 100)
        const edge = {
          source: combos[index].id,
          target: randomNum,
          lineWidth: 1,
          style: {
            lineDash: [3, 3],
            lineWidth: 0.5,
            stroke: '#00AA90'
          }
        }
        nodes.push(node)
        edges.push(edge)
      }
      const data = { combos, edges, nodes }
      console.log(data)
      this.makeRelationData(data)
    },
    // 分组 点 连线处理
    makeRelationData(data) {
      if (graphG) {
        graphG.destroy()
      }
      const drawGraph = document.getElementById('drawGraph')
      this.graphWidth = drawGraph.scrollWidth
      this.graphHeight = drawGraph.scrollHeight || 1200
      const origin = [this.graphWidth / 2, 100]
      const row = 150; const clo = 180
      const combos = data.combos
      const row_clo = Math.floor(Math.sqrt(combos.length))
      for (let i = 0; i < combos.length; i++) {
        const rowindex = Math.floor(i / row_clo) + 1
        const cloindex = (i % row_clo) + 1
        // 分组默认样式设置
        if (i === 0) {
          combos[i].x = this.graphWidth / 3
          combos[i].y = this.graphHeight / 3
          combos[i].style = {
            fill: '#a5e4f0',
            opacity: 0.5,
            cursor: 'pointer'
          }
        } else {
          // 分组定位
          combos[i].x = origin[0] + clo * cloindex
          combos[i].y = origin[1] + row * rowindex
          if (i % 2 === 1) {
            combos[i].y += 40
          }
          combos[i].style = {
            fill: '#f6cd6b',
            fillOpacity: 0.2
          }
        }
      }
      this.drawQfast(data)
    },
    drawQfast(data) {
      graphG = new G6.Graph({
        container: 'drawGraph',
        width: this.graphWidth,
        height: this.graphHeight,
        modes: {
          default: [
            { type: 'zoom-canvas', enableOptimize: true, optimizeZoom: 0.2 },
            { type: 'drag-canvas', enableOptimize: true },
            { type: 'drag-node', enableOptimize: true, onlyChangeComboSize: true },
            { type: 'drag-combo', enableOptimize: true, onlyChangeComboSize: true },
            { type: 'activate-relations', activeState: 'active', inactiveState: 'inactive' }
          ]
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          lineWidth: 1,
          style: {
            endArrow: true,
            stroke: '#FAD069'
          }
        },
        defaultNode: {
          type: 'circle',
          size: 15,
          labelCfg: {
            position: 'bottom',
            style: {
              fontSize: 15
            }
          }
        },
        defaultCombo: {
          cursor: 'pointer',
          opacity: 0,
          type: 'circle',
          lineWidth: 1,
          collapsed: true,
          labelCfg: {
            position: 'top',
            refY: 5,
            style: {
              fontSize: 16
            }
          }
        },
        nodeStateStyles: {
          highlight: {
            fill: '#db4437',
            shadowColor: '#fff',
            stroke: '#db4437',
            cursor: 'pointer',
            'text-shape': {
              lineWidth: 1,
              fill: '#db4437',
              stroke: '#db4437'
            }
          },
          inactive: {
            stroke: '#eee',
            lineWidth: 1,
            'text-shape': {
              fill: '#eee',
              stroke: '#eee'
            }
          }
        },
        edgeStateStyles: {
          hover: {
            lineWidth: 3
          },
          highlight: {
            stroke: '#00AA90',
            lineWidth: 3
          }
        },
        comboStateStyles: {
          highlight: {
            fill: '#f6cd6b',
            opacity: 0.7,
            cursor: 'pointer',
            'text-shape': {
              fill: '#A5E4F0',
              stroke: '#A5E4F0',
              lineWidth: 1
            }
          },
          inactive: {
            stroke: '#eee',
            lineWidth: 1,
            'text-shape': {
              fill: '#eee',
              stroke: '#eee'
            }
          }
        }
      })
      graphG.data(data)
      graphG.render() // 渲染图

      graphG.on('edge:mouseenter', (e) => {
        graphG.setItemState(e.item, 'hover', true)
      })

      graphG.on('edge:mouseleave', (e) => {
        graphG.setItemState(e.item, 'hover', false)
      })
      graphG.on('combo:mouseenter', (e) => {
        const comboItem = e.item
        const originStyle = comboItem._cfg.originStyle['circle-combo'].fill
        comboItem._cfg.styles.highlight.fill = originStyle
        graphG.setItemState(comboItem, 'highlight', true)
        comboItem.getEdges().forEach((edge) => {
          const originStyle = edge._cfg.originStyle['edge-shape'].stroke // 获取边edge 原始颜色
          edge._cfg.styles.highlight.stroke = originStyle
          const edgeSource = edge.getSource()
          const edgeTarget = edge.getTarget()

          if (edgeSource._cfg.type === 'combo' && edgeSource._cfg.model.id == '100-600') {
            const originStyle = edgeSource._cfg.originStyle['circle-combo'].fill // 获取分组combo 原始颜色
            edgeSource._cfg.styles.highlight.fill = originStyle
          }
          if (edgeTarget._cfg.type === 'combo' && edgeTarget._cfg.model.id == '100-600') {
            const originStyle = edgeTarget._cfg.originStyle['circle-combo'].fill
            edgeTarget._cfg.styles.highlight.fill = originStyle
          }
          graphG.setItemState(edgeSource, 'highlight', true)
          graphG.setItemState(edgeTarget, 'highlight', true)
          graphG.setItemState(edge, 'highlight', true)
        })
      })

      graphG.on('combo:mouseleave', () => {
        graphG.setAutoPaint(false)
        graphG.getNodes().forEach(node => {
          graphG.clearItemStates(node)
        })
        graphG.getEdges().forEach(edge => {
          graphG.clearItemStates(edge)
        })
        graphG.getCombos().forEach(combo => {
          graphG.clearItemStates(combo)
        })
        graphG.paint()
        graphG.setAutoPaint(true)
      })
    }
  }
}
</script>
