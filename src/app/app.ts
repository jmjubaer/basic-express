import { error } from 'console';
import express, { NextFunction, Request, Response } from 'express';

const app = express()
const port = 3000
app.use(express.json()) // for parse the json data
app.use(express.text()) // for parse the text data



// use createRouter method

const userRoutes = express.Router()

app.use("/api/v1/users", userRoutes)

userRoutes.get('/create-user', (req: Request, res:Response) => {
  const user = req.body;
  res.json({
    success:  true,
    message: "user created successfully",
    data: user
  })

})



// as usual routes system
// middleware
const middleware = (req:Request, res:Response,next:NextFunction) =>{
  console.log('Middleware called')
  next() // for go the next 
}
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.post('/:param-1/:subparam',middleware, (req: Request, res: Response) => {

  console.log(req.body); // get body data
  console.log(req.params); // get the params
  console.log(req.query); // get the query ?email=jm@example.com

  // res.send('got data') // send the data as a object
  res.json('got data') // return the data as a json
})

// not  found error handler
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  })
})

// global error handler
app.use((error:any,req:Request,res:Response,next:NextFunction)=> {
  if(error){
    res.status(400).json({
      success: false,
      message: "Something went wrong"
    })
  }
})



export default app;