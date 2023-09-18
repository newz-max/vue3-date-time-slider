import { Ref, onMounted } from "vue";
import { createPopper } from "@popperjs/core";
// types
import { UsePopperReturnType } from "./types";

/** 创建 tooltip 实例并返回（包括若干辅助方法） */
export const usePopper = (
  scaleBarRef: Ref<HTMLDivElement | undefined>,
  scaleLabelRef: Ref<HTMLDivElement | undefined>
) => {
  const promiseRes: Promise<UsePopperReturnType> = new Promise(
    (resolve, reject) => {
      onMounted(() => {
        if (!scaleBarRef.value || !scaleLabelRef.value) return reject();

        const popperInstance = createPopper(
          scaleBarRef.value,
          scaleLabelRef.value,
          {
            strategy: "fixed",
            placement: "top",
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: ({ placement, reference, popper }) => {
                    return [-reference.width / 2, 8];
                  },
                },
              },
            ],
          }
        );

        function show() {
          scaleLabelRef.value?.setAttribute("data-show", "");

          // Enable the event listeners
          popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
              ...(options.modifiers || []),
              { name: "eventListeners", enabled: true },
            ],
          }));
          // We need to tell Popper to update the tooltip position
          // after we show the tooltip, otherwise it will be incorrect
          popperInstance.update();
        }

        function hide() {
          scaleLabelRef.value?.removeAttribute("data-show");

          // Disable the event listeners
          popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
              ...(options.modifiers || []),
              { name: "eventListeners", enabled: false },
            ],
          }));
        }

        const showEvents = ["mouseenter", "focus"];
        const hideEvents = ["mouseleave", "blur"];

        showEvents.forEach((event) => {
          scaleBarRef.value?.addEventListener(event, show);
        });

        hideEvents.forEach((event) => {
          scaleBarRef.value?.addEventListener(event, hide);
        });

        const res = {
          popperInstance,
          show,
          hide,
        };

        resolve(res);
      });
    }
  );

  return promiseRes;
};
