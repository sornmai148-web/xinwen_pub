type Locale = "en" | "zh-cn" | "zh-tw" | "km" | "th" | "ms";

interface QueryParams {
  keywords: string;
  parent_label: string;
  sub_label: string;
  filter_value: string;
  field_id: number;
}
