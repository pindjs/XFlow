import React, { useState } from 'react'
/** 图核心组件 & 类型定义 */
import type { IAppLoad, NsGraph } from '@antv/xflow'
import { XFlow, XFlowCanvas } from '@antv/xflow'
/** 图的配置项 */
import { useGraphConfig } from './config-graph'
/** 右键菜单栏 */
import { useMenuConfig } from './menu-config'
/** 图的各种扩展交互组件 */
import { CanvasContextMenu, CanvasMiniMap, CanvasScaleToolbar, CanvasSnapline } from '@antv/xflow'
import './index.less'

export interface IProps {}

const Demo: React.FC<IProps> = () => {
  /** 画布配置 */
  const graphConfig = useGraphConfig()
  /** 右键菜单配置 */
  const menuConfig = useMenuConfig()

  /** 画布渲染数据 */
  const [graphData, setGraphData] = useState<NsGraph.IGraphData>(undefined)

  /** XFlow初始化完成的回调 */
  const onLoad: IAppLoad = async app => {
    const nodes: NsGraph.INodeConfig[] = [
      { id: 'root1', width: 150, height: 40, renderKey: 'NODE1', info: { text: 'root1' } },
      { id: 'down1', width: 150, height: 40, renderKey: 'NODE2', info: { text: 'down1' } },
      { id: 'down2', width: 150, height: 40, renderKey: 'NODE2', info: { text: 'down2' } },
      { id: 'down3', width: 150, height: 40, renderKey: 'NODE2', info: { text: 'down3' } },
    ]
    const edges: NsGraph.IEdgeConfig[] = [
      {
        id: 'root1-down1',
        source: 'root1',
        target: 'down1',
        renderKey: 'EDGE1',
        edgeContentWidth: 60,
        edgeContentHeigt: 30,
        info: { line: 'root1-down1' },
      },
      {
        id: 'root1-down2',
        source: 'root1',
        target: 'down2',
        renderKey: 'EDGE2',
        edgeContentWidth: 60,
        edgeContentHeigt: 30,
        info: { line: 'root1-down2' },
      },
      {
        id: 'root1-down3',
        source: 'root1',
        target: 'down3',
        label: '1:N(纯文本)',
        info: { line: 'root1-down3' },
      },
    ]
    const graphData = { nodes, edges }
    setGraphData(graphData)
  }

  return (
    <XFlow
      className="xflow-user-container"
      graphData={graphData}
      graphLayout={{
        layoutType: 'dagre',
        layoutOptions: {
          type: 'dagre',
          rankdir: 'TB',
          nodesep: 60,
          ranksep: 40,
        },
      }}
      onLoad={onLoad}
      isAutoCenter={true}
    >
      <XFlowCanvas config={graphConfig}>
        <CanvasScaleToolbar position={{ top: 12, left: 12 }} />
        <CanvasContextMenu config={menuConfig} />
        <CanvasMiniMap
          miniMapClz="xflow-custom-minimap"
          nodeFillColor="#690"
          minimapOptions={{
            width: 200,
            height: 120,
          }}
          position={{ top: 12, right: 12 }}
        />
        <CanvasSnapline color="#690" />
      </XFlowCanvas>
    </XFlow>
  )
}

export default Demo
