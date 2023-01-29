import express, {NextFunction, Request, Response} from 'express';
import {User, SignIn, SignUp} from '../models/user';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import path from 'path';


const {ENV,BCRYPT_PEPPER, TOKEN_SECRET, SALT_ROUNDS} = process.env;

const user = new User((ENV as unknown) as string);

const index = async (req: Request, res: Response): Promise<void> =>{
    const index = await user.index().then((item)=>{
        console.log(item);
        res.json(item)
    })
}

const show = async (req: Request, res: Response): Promise<void> =>{
    const show = await user.show(req.params.id).then((item)=>{
        console.log(item);
        res.json(item);
    })
}

const signIn = async (req: Request, res: Response): Promise<void> =>{
    const sign = user.signIn({email: req.body.email, password: req.body.password}).then((item)=>{
        res.json(item);
    });
}

const signUp = async (req: Request, res: Response): Promise<void> =>{
    const temp_user: SignUp = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }

    try {
        const newUser = await user.signUp(temp_user);
        const token = jwt.sign({user: newUser}, (process.env.TOKEN_SECRET as unknown) as string);
        console.log(token);
        res.send("Successfully created user");
        
    } catch (err) {
        res.status(400);
        res.json((err as unknown) as string + user);
    }
    
}

const deleteUser = async (req: Request, res:Response): Promise<void> =>{
    const delUser = user.deleteUser(req.params.id).then((item)=>{
        res.json(item);
    })
}

const login = async(req: Request, res: Response): Promise<void> =>{
    
    try {

        const auth = await user.authenticate({email: req.body.email, password: req.body.password}).then((item)=>{
        const token = jwt.sign({user: item}, (process.env.TOKEN_SECRET as unknown) as string, {algorithm: 'HS256'});
        res.cookie('token', token, {
            httpOnly: true,
            //secure: true,
            maxAge: (5000 * 60),
            //signed: true
        });

        console.log(token);
            
            const header = ()=>{return res.set('authorization', token)};
            header();
            console.log(item);
            
            if(bcrypt.compareSync(req.body.password+BCRYPT_PEPPER, (item?.password as unknown) as string)){
                res.status(200);
                res.send("Login Successful");
            }
            else{
                res.send('Could not connect');
            }
            
            
        });
        
    } catch (err) {
        res.status(400);
        res.json((err as unknown) as string + user);
        
    }
    

}


const verifyAuthToken = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.cookies.token;
    
    try {
        if(typeof token !== 'undefined'){
            const verify = async () =>{
                await jwt.verify(token, (TOKEN_SECRET as unknown) as string);
            }
            next()
        }
        else{
            res.redirect("/login")
        }
        
    } catch (error) {
        console.log(error)
        res.clearCookie("token");
        res.redirect("/login");
    }

}


const user_routes = (app: express.Application): void =>{
    app.get('/users',verifyAuthToken, index);
    app.get('/users/:id',verifyAuthToken, show);
    app.post('/users/signup', signUp);
    app.delete('/users',verifyAuthToken, deleteUser);
    app.post('/users/login', login);
}

export default user_routes;

