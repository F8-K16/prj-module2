export function splitToColumns(list = []) {
  const columns = [];
  const maxRows = 4;
  const maxCols = null;
  for (let i = 0; i < list.length; i += maxRows) {
    columns.push(list.slice(i, i + maxRows));
  }

  if (maxCols !== null) {
    return columns.slice(0, maxCols);
  }

  return columns;
}
