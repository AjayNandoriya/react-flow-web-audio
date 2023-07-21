import React from "react";
import { Handle, Position , useUpdateNodeInternals } from "reactflow";
import { shallow } from "zustand/shallow";
import { tw } from "twind";
import { useStore } from "../store";

const selector = (id) => (store) => ({
  getInputs: () => store.get().nodes.filter((node) => node.id==id)[0].inputs,
  setOutputs: (outputs) => store.updateNode(id, {outputs: outputs}),
  setInputs: (inputs) => store.updateNode(id, {inputs: inputs}),
  setLabel: (label) => store.updateNode(id, {label: label})
})  
;

const DynInputHandle = (props) => {
  const { idx, nodeID } = props;

  return (
    <Handle
      type={"target"}
      id={`${nodeID}_input${idx}`}
      position={Position.Left}
      style={{ top: 10 + idx * 20 }}
    />
  );
};

const DynOutputHandle = (props) => {
  const { idx, nodeID } = props;

  return (
    <Handle
      type={"source"}
      id={`${nodeID}_output${idx}`}
      position={Position.Right}
      style={{ top: 10 + idx * 20 }}
    />
  );
};
export default function FunctionNode({ id, data }) {
  const updateNodeInternals = useUpdateNodeInternals();
  const { setOutputs, setInputs, getInputs, setLabel } = useStore(selector(id), shallow);

  const createInputs = (e)=>{
    const inputCount = e.target.value;
    if (data.inputs.length == inputCount){
      return;
    }
    else if (data.inputs.length > inputCount){
      const inputs = data.inputs.slice(0,inputCount);
      setInputs(inputs);
      
    }
    else{
      const inputs = [...data.inputs, Array(inputCount-data.inputs.length).fill(null)];
      setInputs(inputs);
    }
    updateNodeInternals(id);
  }
  const createOutputs = (e)=>{
    const outputCount = e.target.value;
    if (data.outputs.length == outputCount){
      return;
    }
    else if (data.outputs.length > outputCount){
      const outputs = data.outputs.slice(0,outputCount);
      setOutputs(outputs);
    }
    else{
      const outputs = [...data.outputs, Array(outputCount-data.outputs.length).fill(null)];
      setOutputs(outputs);
    }
    updateNodeInternals(id);
  }

  
  
  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <label className={tw("flex flex-col px-2 py-1")}>
        
        <input
          // className="nodrag"
          className={tw("rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm")}
          type="text"
          defaultValue = {data.label}
          onChange={(e)=>{setLabel(e.target.value)}}
        />
      </label>
      

      <label className={tw("flex flex-col px-2 py-1")}>
        <p className={tw("text-xs font-bold mb-2")}>Inputs : {data.inputs.length}</p>
        <input
          className="nodrag"
          type="range"
          min="0"
          max="10"
          value={data.inputs.length}
          onChange={createInputs}
        />
      </label>

      <label className={tw("flex flex-col px-2 py-1")}>
        <p className={tw("text-xs font-bold mb-2")}>Outputs : {data.outputs.length}</p>
        <input
          className="nodrag"
          type="range"
          min="0"
          max="10"
          value={data.outputs.length}
          onChange={createOutputs}
        />
      </label>
      <hr className={tw("border-gray-200 mx-2")} />

      {Array(data.inputs.length)
        .fill(null)
        .map((_, i) => (
          <DynInputHandle key={i} idx={i} nodeID={id}/>
        ))}
      {Array(data.outputs.length)
        .fill(null)
        .map((_, i) => (
          <DynOutputHandle key={i} idx={i} nodeID={id}/>
        ))}
    </div>
  );
}
