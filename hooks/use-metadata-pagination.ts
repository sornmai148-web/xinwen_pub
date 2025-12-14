import { useQueryState, parseAsString } from "nuqs";

export const useMetadataPagination = () => {
  const [slug, setSlug] = useQueryState("slug", parseAsString.withDefault(""));

  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  const [field_id, setField_id] = useQueryState(
    "field_id",
    parseAsString.withDefault("")
  );

  const [field_value, setField_value] = useQueryState(
    "field_value",
    parseAsString.withDefault("")
  );

  const [parent_label, setParent_label] = useQueryState(
    "parent_label",
    parseAsString.withDefault("")
  );

  const [sub_label, setSub_label] = useQueryState(
    "sub_label",
    parseAsString.withDefault("")
  );

  //-- Update search params
  function updateSearch(search: string) {
    setSearch(search);
  }

  //-- Update field Id
  function updateFieldId(fieldId: string) {
    setField_id(fieldId);
  }

  //-- Update values id
  function updateFieldValue(fieldValue: string) {
    setField_value(fieldValue);
  }

  //-- Update parent label
  function updateParentLabel(parentLabel: string) {
    setParent_label(parentLabel);
  }

  //-- Update parent label
  function updateSubLabel(subLabel: string) {
    setSub_label(subLabel);
  }

  return {
    slug,
    search,
    field_id,
    field_value,
    parent_label,
    sub_label,
    setSlug,
    updateSearch,
    updateFieldId,
    updateFieldValue,
    updateParentLabel,
    updateSubLabel,
  };
};
