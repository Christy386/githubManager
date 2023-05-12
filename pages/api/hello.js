// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/*function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 5.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
//*/
import controller from "@/database/mySQLController";

export default function handler(req, res) {
  let rows;

  controller.getTestTable()
    .then((results) => {
      //console.log(results);
      rows = results
      res.status(200).json({ rows: rows })
    })
    .catch((error) => {
      console.error(error);
    })
}
