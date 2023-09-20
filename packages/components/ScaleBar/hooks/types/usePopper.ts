import { Instance } from "@popperjs/core";

export interface UsePopperReturnType {
  popperInstance: Instance;
  show: () => void;
  hide: () => void;
  hideIsCall: () => void;
}
