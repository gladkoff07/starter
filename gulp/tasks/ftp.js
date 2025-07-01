import { Client } from "basic-ftp"

// add settings Host(create file apiHost.js for your data)
// import dataHost from "../../apiHost.js";

export const deploy = async () => {
  const client = new Client()
  client.ftp.verbose = true
  try {
      await client.access({
        host: dataHost.host,
        user: dataHost.user,
        password: dataHost.password,
        secure: true,
        secureOptions: {
          servername: dataHost.servername
        }
      })
      console.log(await client.list())
      await client.ensureDir("www/html/team-orange.ru/sites/test/")
      await client.uploadFromDir("build/")
  }
  catch(err) {
    console.log(err)
  }
  client.close()
}
