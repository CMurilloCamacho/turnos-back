import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize().then(()=>{
  console.log("DB conectado exitosamente");
  server.listen(PORT, () => {
    console.log(`Server en el puerto ${PORT}`);
  });
}).catch((error)=>{
  console.log("Error al conectar el servicor", error);
  
})


