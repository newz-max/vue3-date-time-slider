import { ScaleBar } from "@/components";

export interface ScaleBarOffsetsItem {
  offset: number;
  dom: HTMLDivElement;
  ref: InstanceType<typeof ScaleBar> | null;
}
