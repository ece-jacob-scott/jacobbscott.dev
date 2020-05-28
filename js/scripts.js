function toggleCollapse(element_id) {
  const element = document.getElementById(element_id);
  const button = document.getElementById(`${element_id}_btn`);
  const state = element.style.display;
  button.classList.toggle("collapse-btn-active");
  if (state !== "block") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}
