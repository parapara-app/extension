export const replacePageText = (newText: string) => {
  document.body.innerText = newText;
  console.log("Page text replaced with:", newText);
};
