import { onBeforeUnmount, onMounted } from "vue";

/** 组件加载时注册事件到 window 组件销毁前注销 */
export function useEventListener<
  T extends Window,
  K extends keyof WindowEventMap
>(
  target: T,
  event: K,
  callback: (this: Window, event: WindowEventMap[K]) => any
) {
  onMounted(() => target.addEventListener(event, callback));
  onBeforeUnmount(() => target.addEventListener(event, callback));
}
