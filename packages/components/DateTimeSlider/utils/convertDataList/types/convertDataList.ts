import { ScaleBarPropsType } from "@/components";

export interface ConvertDataListItemReturnType {
  groupLabel: string;
  groupItems: ConvertDataListItemReturnTypeGroupItem[];
}

export interface ConvertDataListItemReturnTypeGroupItem {
  scaleLabel: string;
  scaleBarType: ScaleBarPropsType;
}
