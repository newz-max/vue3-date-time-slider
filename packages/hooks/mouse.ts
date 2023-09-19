import { ref } from "vue";
import { useEventListener } from ".";

/** 创建鼠标 x y 位置的响应性 ref 对象 */
export const useMouse = () => {
  /** 鼠标在 window 上的 pageX */
  const x = ref(0);
  /** 鼠标在 window 上的 pageY */
  const y = ref(0);

  window.addEventListener("mousemove", (e) => {});
  useEventListener(window, "mousemove", (e) => {
    x.value = e.pageX;
    y.value = e.pageY;
  });

  return {
    x,
    y,
  };
};
