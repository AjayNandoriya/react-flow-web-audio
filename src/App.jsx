import React from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Panel,
  useReactFlow,
} from "reactflow";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";
import { tw } from "twind";
import Osc from "./nodes/Osc";
import Amp from "./nodes/Amp";
import Out from "./nodes/Out";

import "reactflow/dist/style.css";
import ImgUpload from "./nodes/ImgUpload";
import ImgDisplay from "./nodes/ImgDisplay";
import FunctionNode from "./nodes/FunctionNode";

const nodeTypes = {
  osc: Osc,
  amp: Amp,
  out: Out,
  imgUpload: ImgUpload,
  imgDisplay: ImgDisplay,
  functionNode: FunctionNode
};

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onNodesDelete: store.onNodesDelete,
  onEdgesChange: store.onEdgesChange,
  onEdgesDelete: store.onEdgesDelete,
  addEdge: store.addEdge,
  addOsc: () => store.createNode("osc"),
  addAmp: () => store.createNode("amp"),
  addImgUpload: () => store.createNode("imgUpload"),
  addImgDisplay: () => store.createNode("imgDisplay"),
  addFunctionNode: () => store.createNode("functionNode"),
});

export default function App() {
  const store = useStore(selector, shallow);
  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={store.nodes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onNodesDelete={store.onNodesDelete}
      onEdgesChange={store.onEdgesChange}
      onEdgesDelete={store.onEdgesDelete}
      onConnect={store.addEdge}
      fitView
    >
      <Panel className={tw("space-x-4")} position="top-right">
        <button
          className={tw("px-2 py-1 rounded bg-white shadow")}
          onClick={store.addOsc}
        >
          Add Osc
        </button>
        <button
          className={tw("px-2 py-1 rounded bg-white shadow")}
          onClick={store.addAmp}
        >
          Add Amp
        </button>
        <button
          className={tw("px-2 py-1 rounded bg-white shadow")}
          onClick={store.addImgUpload}
        >
          Add ImgUpload
        </button>
        <button
          className={tw("px-2 py-1 rounded bg-white shadow")}
          onClick={store.addImgDisplay}
        >
          Add ImgDisplay
        </button>
        <button
          className={tw("px-2 py-1 rounded bg-white shadow")}
          onClick={store.addFunctionNode}
        >
          Add FunctionNode
        </button>
      </Panel>
      <Background />
    </ReactFlow>
  );
}
