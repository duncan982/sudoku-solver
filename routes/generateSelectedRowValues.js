const generateSelectedRowValues = (selectedRow) => {
  /**  generate selected row values*/

  // iterate selecteRow to obtain values
  let selectedRowValues = [];
  selectedRow.forEach((cordinate) => {
    for (const [keys, values] of Object.entries(cordinate)) {
      selectedRowValues.push(values);
    }
  });

  return selectedRowValues;
};
module.exports = generateSelectedRowValues;
