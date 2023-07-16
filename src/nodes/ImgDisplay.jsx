import React from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { tw } from "twind";
import { useStore } from "../store";

const selector = (id) => (store) => ({
  getImage: (e) => store.get().nodes.filter((node) => node.id==id)[0].img,
})  
;

export default function ImgDisplay({ id, data }) {
  const { setImage } = useStore(selector(id), shallow);

  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <p
        className={tw("rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm")}
      >
        ImageDisplay
      </p>

      <label className={tw("flex flex-col px-2 py-1")}>
        <p className={tw("text-xs font-bold mb-2")}>Image</p>
        <canvas></canvas>
      </label>

      <hr className={tw("border-gray-200 mx-2")} />

      <Handle className={tw("w-2 h-2")} type="target" position="top" />
    </div>
  );
}
