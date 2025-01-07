export const formatDate = (dateString) => {
  if (!dateString) return "তথ্য নেই";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
};
