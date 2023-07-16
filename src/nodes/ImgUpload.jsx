import React from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { tw } from "twind";
import { useStore } from "../store";

const selector = (id) => (store) => ({
  setImage: (e) => store.updateNode(id, { img: e.target.files[0] }),
  
});

export default function ImgUpload({ id, data }) {
  const { setImage } = useStore(selector(id), shallow);

  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <p
        className={tw("rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm")}
      >
        ImageUpload
      </p>

      <label className={tw("flex flex-col px-2 py-1")}>
        <p className={tw("text-xs font-bold mb-2")}>Image</p>
        <input
          className="nodrag"
          type="file"
          onChange={setImage}
        />
        <p className={tw("text-right text-xs")}>{data.img_fname}</p>
      </label>

      <hr className={tw("border-gray-200 mx-2")} />

      <Handle className={tw("w-2 h-2")} type="source" position="bottom" id={`${id}_out_0`}/>
      <Handle className={tw("w-2 h-2")} type="source" position="bottom"  id={`${id}_out_1`} style={{ left: 10 }}/>
    </div>
  );
}
