<template>
  <div id="mountNode" />
</template>

<script>
import G6 from '@antv/g6'
export default {

  data() {
    return {
      chart: null,
      graph: null,
      data: {
        nodes: [
          {
            id: '-3',
            value: {
              title: '来源页面A',
              items: [
                {
                  text: '曝光PV',
                  value: '10.30万',
                  icon:
                    'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png'
                }
              ]
            }
          },
          {
            id: '-2',
            value: {
              title: '来源页面B',
              items: [
                {
                  text: '点击UV',
                  value: '10.30万',
                  icon:
                    'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png'
                }
              ]
            }
          },
          {
            id: '-1',
            value: {
              title: '来源页面C',
              items: [
                {
                  text: '访问页面UV'
                }
              ]
            }
          },
          {
            id: '0',
            value: {
              title: '活动页面',
              items: [
                {
                  text: '访问页面UV'
                }
              ]
            }
          },
          {
            id: '1',
            value: {
              title: '去向页面A',
              items: [
                {
                  text: '访问页面UV'
                }
              ]
            }
          },
          {
            id: '2',
            value: {
              title: '去向页面B',
              items: [
                {
                  text: '访问页面UV'
                }
              ]
            }
          },
          {
            id: '3',
            value: {
              title: '去向页面C',
              items: [
                {
                  text: '访问页面UV'
                }
              ]
            }
          },
          {
            id: '4',
            value: {
              title: '去向页面D',
              items: [
                {
                  text: '访问页面UV'
                }
              ]
            }
          },
          {
            id: '5',
            value: {
              title: '去向页面E',
              items: [
                {
                  text: '访问页面UV'
                }
              ]
            }
          },
          {
            id: '6',
            value: {
              title: '去向页面F',
              items: [
                {
                  text: '访问页面UV'
                }
              ]
            }
          },
          {
            id: '6',
            value: {
              title: '去向页面F',
              items: [
                {
                  text: '访问页面UV'
                }
              ]
            }
          },
          {
            id: '7',
            value: {
              title: '去向页面G',
              items: [
                {
                  text: '访问页面UV'
                }
              ]
            }
          },
          {
            id: '8',
            value: {
              title: '去向页面H',
              items: [
                {
                  text: '访问页面UV'
                }
              ]
            }
          }
        ],
        edges: [
          {
            source: '-3',
            target: '0',
            value: '来源A'
          },
          {
            source: '-2',
            target: '0',
            value: '来源B'
          },
          {
            source: '-1',
            target: '0',
            value: '来源C'
          },
          {
            source: '0',
            target: '1'
          },
          {
            source: '0',
            target: '2'
          },
          {
            source: '0',
            target: '3'
          },
          {
            source: '0',
            target: '4'
          },
          {
            source: '0',
            target: '5'
          },
          {
            source: '2',
            target: '6'
          },
          {
            source: '3',
            target: '7'
          },
          {
            source: '4',
            target: '8'
          }
        ]
      }
    }
  },

  created() { this.initG6() },
  mounted() {
    this.initG6()
  },
  beforeDestroy() {
    // if (this.chart !== '') {
    //     this.chart.destroy()
    //   }
  },
  methods: {
    initG6() {
      G6.registerNode(
        'operation',
        {
          drawShape: function drawShape(cfg, group) {
            var rect = group.addShape('rect', {
              attrs: {
                x: -75,
                y: -25,
                width: 150,
                height: 50,
                radius: 10,
                stroke: '#00C0A5',
                fill: '#92949F',
                fillOpacity: 0.45,
                lineWidth: 2
              }
            })
            return rect
          }
        },
        'single-shape'
      )
      var graph = new G6.Graph({
        container: 'mountNode',
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: 2,
        modes: {
          default: ['drag-canvas', 'zoom-canvas']
        },
        // 配置节点的属性
        defaultNode: {
          type: 'rect',
          size: [120, 34],
          shape: 'operation',
          labelCfg: {
            style: {
              fill: '#666',
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          label: '节点'
        },
        defaultEdge: {
          shape: 'polyline',
          label: '边'
        },
        edgeStyle: {
          default: {
            endArrow: true,
            lineWidth: 2,
            stroke: '#ccc'
          }
        },
        layout: {
          direction: 'TB'
        }
      })
      graph.data(this.data)
      graph.render()
      graph.fitView()
    }
  }

}
</script>

<style lang="less" scoped></style>

