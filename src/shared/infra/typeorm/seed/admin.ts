import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { User } from "../../../../modules/accounts/infra/typeorm/entities/User";
import { appDataSource } from "../data-source";

async function create() {
  appDataSource.initialize().then(async () => {
    const id = uuidV4();
    const password = await hash("admin", 8);

    appDataSource.query(`INSERT INTO USERS(id, name, driver_license, email, password, "isAdmin", created_at)
    values('${id}', 'admin','123123123','admin@rentx.com.br', '${password}', true, now())`);
  });

  // const userAdmin: User = {};
}

create().then(() => console.log("User admin created"));
