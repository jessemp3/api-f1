import { log } from "console";
import fastify from "fastify";

const server = fastify({logger: true});

const teams = [
        {id:1, name:"Red Bull"},
        {id:2, name:"Mercedes"},
        {id:3, name:"Ferrari"},
        {id:4, name:"McLaren"},
        {id:5, name:"Alpine"},
        {id:6, name:"Alfa Romeo"},
        {id:7, name:"Aston Martin"},
        {id:8, name:"Haas"},
        {id:9, name:"Williams"}, 
        {id:10, name:"Alpha Tauri"}
]

const drivers = [
    {id:1, name:"Max Verstappen" , team:"Red Bull"},
    {id:2, name:"Sergio Perez" , team:"Red Bull"},
    {id:3, name:"Lewis Hamilton" , team:"Mercedes"},
    {id:4, name:"George Russell" , team:"Mercedes"},
    {id:5, name:"Charles Leclerc" , team:"Ferrari"},
    {id:6, name:"Carlos Sainz" , team:"Ferrari"},
    {id:7, name:"Lando Norris" , team:"McLaren"},
    {id:8, name:"Oscar Piastri" , team:"McLaren"},
    {id:9, name:"Esteban Ocon" , team:"Alpine"},
    {id:10, name:"Pierre Gasly" , team:"Alpine"},
]


server.get("/" , async(req,res) => {
    res.type("application/json").code(200)

    return {
        message: "server is running, into with some route"
    }
})


server.get("/teams" , async(req, res) => {
    res.type("application/json").code(200)

    return teams
})


server.get("/drivers" , async(req, res) => {
    res.type("application/json").code(200)

    return drivers
})

interface Driver {
    id: string
}


server.get<{Params:Driver}>("/drivers/:id", async(req, res) => {
    const id = parseInt(req.params.id)
    const driver = drivers.find(d => d.id === id)

    if (!driver) {
        return res.status(404).send({message: "Driver not found"})
    }else{
    res.type("application/json").code(200)
    return driver
    }
})



server.listen({port: 3000}, () => {
    log("Server is running on port 3000")
})