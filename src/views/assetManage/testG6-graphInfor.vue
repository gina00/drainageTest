<template>
  <div style="position:relative">
    <div style="position:absolute;right:20px;top:20px">
      <el-select
        v-if="isShowSelect"
        v-model="searchNode"
        filterable
        placeholder="请选择"
        size="mini"
        clearable
        style="width: 130px; margin-right: 10px"
        value-key="id"
        @change="searchNodeFun"
      >
        <el-option
          v-for="node in searchNodeList.nodes"
          :key="node.id"
          :label="node.name"
          :value="node.id"
        />
      </el-select>
      <el-button-group
        style="
          vertical-align: bottom;
          background-color: #409eff;
          overflow: hidden;
          border-radius: 3px;
        "
      >
        <el-tooltip effect="dark" content="定位" placement="top">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            style="border-radius: 3px"
            @click.stop="isShowSelect=!isShowSelect"
          />
        </el-tooltip>
        <el-tooltip effect="dark" content="放大" placement="top">
          <el-button
            type="primary"
            icon="el-icon-zoom-in"
            size="mini"
            @click="clickToolbar('zoomOut',localGraph)"
          />
        </el-tooltip>
        <el-tooltip effect="dark" content="缩小" placement="top">
          <el-button
            type="primary"
            icon="el-icon-zoom-out"
            size="mini"
            @click="clickToolbar('zoomIn',localGraph)"
          />
        </el-tooltip>
        <el-tooltip effect="dark" content="全屏" placement="top">
          <el-button
            type="primary"
            icon="el-icon-full-screen"
            size="mini"
            @click="clickToolbar('autoZoom',localGraph)"
          />
        </el-tooltip>
        <!-- <el-tooltip effect="dark" content="信息面板" placement="top">
          <el-button
            type="primary"
            size="mini"
            icon="icon-A10478_Switch"
            :style="{ float: 'right' }"
          />
        </el-tooltip> -->
      </el-button-group>
    </div>

    <div id="mountNode" style="margin-top: 20px" />
  </div>
</template>
<script>
import G6 from '@antv/g6'
import insertCss from 'insert-css'
import { graphDetail } from '@/api/g6.js'
insertCss(`
  .g6-component-tooltip {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 0px 10px 24px 10px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`)
let graph = {}
export default {
  data() {
    return {
      isShowSelect: false,
      dataList: {},
      searchNode: null,
      searchNodeList: [],
      lastSelectedNodeArr: [],
      localGraph: {},
      autoIncrementId: 100
    }
  },
  mounted() {
    // this.initG6()
    this.getData()
  },
  methods: {
    getData() {
      graphDetail(this.$route.query.menuId, this.$route.query.assetId)
        .then((response) => {
          this.dataList = response.data
          this.initregistG6()
          this.searchNodeList = JSON.parse(JSON.stringify(this.dataList))
        })
        .finally(() => {
          this.searchNodeFun(this.$route.query.assetId)
          // this.clickToolbar('autoZoom',localGraph)
          // this.loading = false
        })
    },
    /* tree转化平级数组 */
    treeToList(tree) {
      var queen = []
      var out = []
      queen = queen.concat(tree)
      while (queen.length) {
        var first = queen.shift()
        if (first.children) {
          queen = queen.concat(first.children)
          delete first['children']
        }
        out.push(first)
      }
      return out
    },
    // 文字过长显示...
    fittingString(str, maxWidth, fontSize) {
      const ellipsis = '...'
      const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0]
      let currentWidth = 0
      let res = str
      const pattern = new RegExp('[\u4E00-\u9FA5]+') // distinguish the Chinese charactors and letters
      str.split('').forEach((letter, i) => {
        if (currentWidth > maxWidth - ellipsisLength) return
        if (pattern.test(letter)) {
          // Chinese charactors
          currentWidth += fontSize
        } else {
          // get the width of single letter according to the fontSize
          currentWidth += G6.Util.getLetterWidth(letter, fontSize)
        }
        if (currentWidth > maxWidth - ellipsisLength) {
          res = `${str.substr(0, i)}${ellipsis}`
        }
      })
      return res
    },
    fittingColor(level) {
      if (level == 1) {
        return '#00aaff'
      } else if (level == 2) {
        return '#5F95FF'
      } else if (level == 3) {
        return '#61DDAA'
      } else if (level == 4) {
        return '#65789B'
      } else {
        return '#78D3F8'
      }
    },
    searchNodeFun(id) {
      // 查询是否有被选中节点,并清除样式
      if (this.lastSelectedNode) {
        graph.setItemState(this.lastSelectedNode, 'active', false)
        const edges = this.lastSelectedNode.getEdges()
        edges.forEach((edge) => graph.setItemState(edge, 'running', false))
        this.lastSelectedNode = null
      }
      if (id) {
        const subData = graph.findById(id)
        this.lastSelectedNode = subData
        window.console.log(subData)
        graph.focusItem(subData, true, {
          easing: 'easeCubic',
          duration: 500
        })
        graph.setItemState(subData, 'active', true)
        const edges = subData.getEdges()
        edges.forEach((edge) => graph.setItemState(edge, 'running', true))
        graph.translate(0, -50)
      } else {
        this.clickToolbar('autoZoom', this.localGraph)
      }
    },

    clickToolbar(code, graph) {
      const animateCfg = { duration: 200, easing: 'easeCubic' }
      switch (code) {
        case 'zoomOut':
          graph.zoom(1.2, undefined, true, animateCfg)
          break
        case 'zoomIn':
          graph.zoom(0.8, undefined, true, animateCfg)
          break
        case 'realZoom':
          graph.zoomTo(1, undefined, true, animateCfg)
          break
        case 'autoZoom':
          graph.fitView(20, undefined, true, animateCfg)
          break
      }
    },
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min // 含最大值，含最小值
    },
    /**
   * 点击收起/展开的事件
   * @param {*} evtName 节点名称
   * @param {*} model 当前点击的数据模型
   */
    updateGraph(evtName, model) {
      window.console.log('evtName', evtName)
      window.console.log('model', model)
      const newNodesData = [] // 新的节点数据
      let newEdgesData = [] // 新的边数据
      if (evtName === 'p-marker') {
        if (model.parentCollapse) { // 目前是折叠状态，需要展开
          newEdgesData = [].concat(this.dataList.edges)
          const newAddNodes = []
          const newIds = []
          for (let i = 0; i < 2; i++) { // 固定添加两条数据，之后改成请求
          // newNodesData[curNodeIndex].parentIds.push(String(autoIncrementId));

            newIds.push(this.autoIncrementId + '')
            const randomType = this.getRandomIntInclusive(1, 8)
            console.log(randomType, 'randomType')
            const colorItem = this.fittingColor(randomType)
            newAddNodes.push({
              id: this.autoIncrementId + '',
              name: `测试新增父name${this.autoIncrementId}`,
              taskId: `10000${this.autoIncrementId}`,
              parentIds: [],
              childIds: model.childIds.concat([model.id]),
              level: 'parent',
              hasChild: true,
              hasParent: true,
              parentCollapse: true,
              childCollapse: false,
              textColor: colorItem.textColor
            })
            newEdgesData.push({
              target: model.id,
              source: this.autoIncrementId + ''
            })
            this.autoIncrementId++
          }
          const curNodeIndex = this.dataList.nodes.findIndex(item => item.id === model.id) // 当前点击的节点在节点数据中的下标
          this.dataList.nodes[curNodeIndex].parentCollapse = false
          this.dataList.nodes[curNodeIndex].parentIds = this.dataList.nodes[curNodeIndex].parentIds.concat(newIds)
          this.dataList.nodes.concat(newAddNodes).forEach(node => {
            if (model.childIds.includes(node.id)) {
              node.parentIds = node.parentIds.concat(newIds)
            }
            newNodesData.push(node)
          })
        }
      }
    },
    initregistG6() {
      const _that = this
      // 边样式
      const defaultEdgeStyle = {
        stroke: '#666',
        endArrow: {
          path: G6.Arrow.vee(5, 5, 10),
          // path: "M 0,0 L 12, 6 L 9,0 L 12, -6 Z",
          fill: '#666',
          opacity: 0.8,
          d: 10
        }
      }
      // 提示框
      const tooltip = new G6.Tooltip({
        offsetX: 10,
        offsetY: 10,
        // v4.2.1 起支持配置 trigger，click 代表点击后出现 tooltip。默认为 mouseenter
        trigger: 'click',
        // the types of items that allow the tooltip show up
        // 允许出现 tooltip 的 item 类型
        itemTypes: ['node', 'edge'],
        // custom the tooltip's content
        // 自定义 tooltip 内容
        getContent: (e) => {
          const outDiv = document.createElement('div')
          outDiv.style.width = 'fit-content'
          // outDiv.style.padding = '0px 0px 20px 0px';
          outDiv.innerHTML = `
            <h4>节点详情</h4>
            <ul>
              <li>节点名称: ${
  e.item.getModel().label || e.item.getModel().id
}</li>
            </ul>
            <ul>
              <li>页面来源: ${e.item.getModel().source}</li>
            </ul>
            <ul>
              <li>节点类型: ${e.item.getType()}</li>
            </ul>
            `
          return outDiv
        }
      })

      const getTextSize = (str, maxWidth, fontSize) => {
        const width = G6.Util.getTextSize(str, fontSize)[0]
        return width > maxWidth ? maxWidth : width
      }
      G6.registerNode('card-node', {
        options: {
          anchorPoints: [[0.5, 0], [0.5, 1]],
          style: {
            fill: '#d3adf7'
          },
          stateStyles: {
            hoverq: {
              fill: 'red',
              // name 为 node-label 的子图形在该状态值下的样式
              'node-label': {
                fontSize: 15
              }
            },
            selected: {
              fill: '#d3adf7',
              // name 为 node-label 的子图形在该状态值下的样式
              'node-label': {
                fontSize: 15
              }
            }
          }
        },
        draw: function drawShape(cfg, group) {
          // const { bgColor, icon } = cfg
          const r = 2
          // const color = '#00aaff'
          const w = getTextSize(cfg.name, 120, 16) + 20
          const h = 20
          const rectConfig = {
            x: -w / 2,
            y: -h / 2,
            width: w,
            height: h,
            lineWidth: 1,
            fontSize: 12,
            fill: _that.fittingColor(cfg.level),
            radius: r,
            opacity: 1,
            stroke: _that.fittingColor(cfg.level)
          }
          const shape = group.addShape('rect', {
            attrs: {
              ...rectConfig
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: 'main-box',
            draggable: true
          })
          // title text
          group.addShape('text', {
            attrs: {
              textBaseline: 'middle',
              // x: -w / 2 + 4,
              // y: -h / 2 + 6,
              lineHeight: 20,
              text: _that.fittingString(cfg.name, 100, 12),
              fill: '#fff',
              fontSize: 12,
              textAlign: 'center'
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: 'title'
          })
          cfg.hasParent &&
            group.addShape('marker', {
              attrs: {
                x: 0,
                y: -h / 2 - 4,
                r: 6,
                cursor: 'pointer',
                symbol: cfg.parentCollapse ? G6.Marker.expand : G6.Marker.collapse,
                stroke: '#666',
                lineWidth: 1,
                fill: '#fff'
              },
              // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
              name: 'p-marker'
            })
          cfg.hasChild &&
            group.addShape('marker', {
              attrs: {
                x: 0,
                y: h / 2 + 4,
                r: 6,
                cursor: 'pointer',
                symbol: cfg.childCollapse ? G6.Marker.expand : G6.Marker.collapse,
                stroke: '#666',
                lineWidth: 1,
                fill: '#fff'
              },
              // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
              name: 'c-marker'
            })

          return shape
        },
        setState(name, value, item) {
          if (name === 'parentCollapse') {
            const pmarker = item
              .get('group')
              .find((ele) => ele.get('name') === 'p-marker')
            const icon = value ? G6.Marker.expand : G6.Marker.collapse
            pmarker.attr('symbol', icon)
          } else if (name === 'childCollapse') {
            const cmarker = item
              .get('group')
              .find((ele) => ele.get('name') === 'c-marker')
            const icon = value ? G6.Marker.expand : G6.Marker.collapse
            cmarker.attr('symbol', icon)
          }
          // if (name === 'collapsed') {
          //   const marker = item
          //     .get('group')
          //     .find((ele) => ele.get('name') === 'collapse-icon')
          //   const icon = value ? G6.Marker.expand : G6.Marker.collapse
          //   marker.attr('symbol', icon)
          // }
          const group = item.getContainer()
          const shape = group.get('children')[0]

          if (name === 'active') {
            if (value) {
              shape.attr('stroke', '#F08BB4')
              shape.attr('fill', '#F08BB4')
            } else {
              shape.attr('stroke', _that.fittingColor(item.getModel().level))
              shape.attr('fill', _that.fittingColor(item.getModel().level))
            }
          }
        }
      })
      // 自定义边
      G6.registerEdge('flow-line', {
        draw(cfg, group) {
          const startPoint = cfg.startPoint
          const endPoint = cfg.endPoint
          const { style } = cfg
          const shape = group.addShape('path', {
            attrs: {
              linkDistance: 100,
              lineDash: [4, 2],
              lineWidth: 0.5,
              stroke: style.stroke,
              endArrow: style.endArrow,
              path: [
                ['M', startPoint.x, startPoint.y],
                ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
                ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
                ['L', endPoint.x, endPoint.y]
              ]
            }
          })
          return shape
        },
        afterDraw(cfg, group) {
          // 获取图形组中的第一个图形，在这里就是边的路径图形
          const shape = group.get('children')[0]
          // 获取路径图形的中点坐标
          const midPoint = shape.getPoint(0.5)
          // 在中点增加一个矩形，注意矩形的原点在其左上角
          // group.addShape('rect', {
          //   attrs: {
          //     width: 40,
          //     height: 10,
          //     fill: 'red',
          //     fontSize: 12,
          //     textAlign: "center",
          //     // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
          //     x: midPoint.x - 5,
          //     y: midPoint.y - 5
          //   },
          //   name: 'mid-point-edge-rect', // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
          // });
          group.addShape('text', {
            attrs: {
              text: cfg.label,
              width: 40,
              height: 10,
              fontSize: 10,
              fill: '#999',
              textAlign: 'center',
              // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
              x: midPoint.x - 5,
              y: midPoint.y - 5
            },
            name: 'mid-point-edge-rect' // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
          })
        },
        // update: undefined,
        // 边设置动画状态
        setState(name, value, item) {
          const lineDash = [4, 2, 1, 2]
          const shape = item.get('keyShape')
          if (name === 'running') {
            if (value) {
              let index = 0
              shape.animate(
                () => {
                  index++
                  if (index > 9) {
                    index = 0
                  }
                  const res = {
                    lineDash,
                    lineDashOffset: -index
                  }
                  // return the params for this frame
                  return res
                },
                {
                  repeat: true,
                  duration: 300
                }
              )
              shape.attr('lineWidth', 1)
              shape.attr('stroke', '#0af')
            } else {
              shape.stopAnimate()
              shape.attr('lineWidth', 0.5)
              shape.attr('stroke', '#666')
            }
          }
        }
      }
      )
      const container = document.getElementById('mountNode')
      const width = container.scrollWidth
      const height = container.scrollHeight || 700
      const minimap = new G6.Minimap({
        size: [150, 100]
      })
      graph = new G6.Graph({
        container: container,
        width,
        height,
        linkCenter: true,
        modes: {
          default: [
            'drag-canvas', 'zoom-canvas', 'drag-node']
        },
        defaultNode: {
          type: 'card-node',
          size: [100, 20]
        },
        defaultEdge: {
          // type: 'polyline',
          type: 'flow-line',
          style: defaultEdgeStyle,
          sourceAnchor: 1,
          targetAnchor: 0
        },
        plugins: [tooltip, minimap],
        layout: {
          type: 'dagre',
          nodesep: 50, // 节点间距
          ranksep: 40, // 层间距
          controlPoints: true,
          getId: function getId(d) {
            return d.id
          },
          getHeight: function getHeight() {
            return 20
          },
          getWidth: function getWidth() {
            return 40
          },
          getVGap: function getVGap() {
            return 40
          },
          getHGap: function getHGap() {
            return 40
          }
        },
        fitView: true,
        fitViewPadding: 20
      })
      graph.node(function(node) {
        // let position = 'right';
        // let rotate = 0;
        // let size = [120,20];
        // if (!node.children) {
        //   position = 'bottom';
        //   rotate = Math.PI / 2;
        // }
        return {
          label: node.name,
          style: {
            // rotate,
            fontSize: 12,
            textAlign: 'start',
            fill: '#2db7f5',
            stroke: '#ea7171'
          },
          labelCfg: {
            // position,
            offset: 0,
            // size:size,
            style: {
              // rotate,
              fontSize: 12,
              textAlign: 'start',
              fill: '#2db7f5',
              stroke: '#ea7171'
            }
          }
        }
      })
      graph.edge(function(node) {
        return {
          label: node.label,
          style: {
            lineDash: [4, 2],
            lineWidth: 0.5
          },
          labelCfg: {
            // position,
            offset: 0,
            // size:size,
            style: {
              // rotate,
              fontSize: 12,
              fill: '#666'
            }
          }
        }
      })
      G6.Util.traverseTree(this.dataList, (item) => {
        // 深度遍历
        // type在G6树结构有含义，表示节点形状,如果后端数据中有type需要重新定义
        // item.dataType = item.type
        // item.type = "rNode";
        // 获取itemStatusName
        if (item.level == 3) {
          item.collapsed = true
        }
      })
      graph.data(this.dataList)
      graph.render()
      graph.fitView()
      // graph.render()
      graph.on('node:click', (e) => {
        const name = e.target.get('name')
        const model = e.item.getModel()
        if (name === 'p-marker') {
          model.parentCollapse = !model.parentCollapse
          graph.setItemState(e.item, 'parentCollapse', model.parentCollapse)
          graph.layout()
        } else if (name === 'c-marker') {
          model.childCollapse = !model.childCollapse
          graph.setItemState(e.item, 'childCollapse', model.childCollapse)
          graph.layout()
        }
        this.updateGraph(name, model)
      })
      graph.on('node:mouseenter', (e) => {
        graph.setItemState(e.item, 'active', true)
        const node = e.item
        const edges = node.getEdges()
        edges.forEach((edge) => graph.setItemState(edge, 'running', true))
      })
      graph.on('node:mouseleave', (e) => {
        graph.setItemState(e.item, 'active', false)
        const node = e.item
        const edges = node.getEdges()
        edges.forEach((edge) => graph.setItemState(edge, 'running', false))
      })
      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight) { return }
          graph.changeSize(container.scrollWidth, container.scrollHeight)
        }
      }
      this.localGraph = graph
    }
  }
}
</script>
