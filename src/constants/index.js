import path from "node:path"

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');



// content:
//   application/json:
//     schema:
//       type: object
//       required:
//         - status
//         - message
//   properties:
//     status:
//       type: integer
//       example: 400
//       message:
//         type: string
//         example: Name, phoneNumber, and contactType are required!