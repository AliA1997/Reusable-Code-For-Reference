import defineBarChart from './defineBarChart'; // - data object must have label, and value properties
import definePieChart from './definePieChart'; // - data object must have label, and quantity properties
export const ChartTypes = { PIE: 'pie', BAR: 'bar' };
export default function({
  type,
  dataSet,
  height,
  width,
  customMargins,
}) {
  if(type === ChartTypes.BAR) return defineBarChart({  dataSet, height, width, customMargins });
  if(type === ChartTypes.PIE) return definePieChart({  dataSet, height, width, customMargins });
}