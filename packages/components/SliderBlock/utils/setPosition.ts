import { Ref } from "vue";

/** 基础左偏移量 */
export const baseLeftOffset = -7;
/** 设定指定 block 的位置 */
export const setPosition = (
  blockRef: Ref<HTMLDivElement>,
  position: number
) => {
  const left = position + baseLeftOffset;
  blockRef.value.setAttribute("style", `left : ${left}px`);
};
