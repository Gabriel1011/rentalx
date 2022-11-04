import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { appDataSource } from "../data-source";

async function create() {
  const connection = await appDataSource.initialize();

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(`INSERT INTO USERS(id, name, driver_license, email, password, "isAdmin", created_at)
    values('${id}', 'admin','123123123','admin@rentx.com.br', '${password}', true, now())`);

  await appDataSource.destroy();
  // const userAdmin: User = {};
}

create().then(() => console.log("User admin created"));
