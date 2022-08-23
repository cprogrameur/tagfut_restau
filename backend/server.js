const cors = require("cors");
const express = require("express");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const bcrypt = require('bcrypt');
const auth = require('./middlewares/auth');
const multer = require('./middlewares/multer-config');
const app = express();
const fs = require('fs');


app.use(cors());
app.use(express.json());
const serviceAccount = require('./blog-cert.json');
initializeApp({
    credential: cert(serviceAccount)
  });
const db = getFirestore();

//Login 
app.post('/api/auth/login', async (req, res) => {
    const email = req.email;
    await db.collection('users')
        .where('email', '==', email)
        .get().then(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    } 
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
})

//Save messages
app.post('/api/contact', async (req, res) => {
    try {
        const contactJson = {
            email: req.body.email,
            name: req.body.name,
            message: req.body.message,
            phone: req.body.phone
        };
        var hash = req.body.email
        const id =  hash+'_'+Date.now();
        console.log(id)
        var contactsDb = db.collection('contacts');
        const response = await contactsDb.doc(id).set(contactJson);
        res.send({ response: response, message: 'Message Envoyé!' });
    } catch (error) {
        res.send(error);
    }
})
//Get Messages
app.get('/blog/contacts',auth, async (req, res) => {
    try {
        const contactsDb = db.collection('contacts');
        const response = await contactsDb.get()
        res.send({ response: response })
    } catch (error) {
        res.send(error)
    }
})
//Delete Messages
app.delete('/blog/contact/:id',auth, async (req, res) => {
    try {
        const id = req.params.id;
        const contactsDb = db.collection('contacts').doc(id);
        const response = await contactsDb.delete()
        res.send({ response: response, message: 'Message supprimé!' })
    } catch (error) {
        res.send(error)
    }
})

//Posts gestion
//Save Posts
app.post('/blog/post',multer, async (req, res) => {
    try {
        console.log(req.body)
        const postJson = {
            titre: req.body.email,
            apperçu: req.body.name,
            couverture: `${req.protocol}://${req.get('host')}/images/${req.files.couverture.filename}`,
            blocs: [
                {
                    titre:req.body.bloc1.titre,
                    contenu:req.body.bloc1.appercu,
                    photo:`${req.protocol}://${req.get('host')}/images/${req.files.bloc1.filename}`
                },
                {
                    titre:req.body.bloc2.titre,
                    contenu:req.body.bloc2.appercu,
                    photo:`${req.protocol}://${req.get('host')}/images/${req.files.bloc2.filename}`
                },
                {
                    titre:req.body.bloc3.titre,
                    contenu:req.body.bloc3.appercu,
                    photo:`${req.protocol}://${req.get('host')}/images/${req.files.bloc3.filename}`
                },
                {
                    titre:req.body.bloc4.titre,
                    contenu:req.body.bloc4.appercu,
                    photo:`${req.protocol}://${req.get('host')}/images/${req.files.bloc1.filename}`
                }],
            categorie: req.body.categorie,
            author: req.body.author,
            posted_at: req.body.date
        };
        var hash = req.body.author;
        const id =  hash+'_'+Date;
        const postsDb = db.collection('posts');
        const response = await postsDb.doc(id).set(postJson);
        res.send({ response: response, message: 'Post Enregistré!' });
    } catch (error) {
        res.send(error);
    }
})
//Post images
app.post('/blog/images/:name',auth,multer,async(req,res)=>{

})
//Get Posts
app.get('/blog/posts/first', async (req, res) => {
    try {
        const postsDb = db.collection('posts');
        const lastFives = await postsDb.orderBy('id', 'desc').limit(5).get();
        res.send({ response: lastFives })
    } catch (error) {
        res.send(error)
    }
})
app.get('/blog/posts/:last', async (req, res) => {
    try {
        const last = req.params.last;
        const postsDb = db.collection('posts');
        const nextFives = await postsDb
        .orderBy('id', 'desc')
        .startAfter(last)
        .limit(5).get();
        if(nextFives)
            res.send({ response: nextFives })
        else
            res.send({ message: "Vous avez parcouru toute la liste." })
    } catch (error) {
        res.send(error)
    }
})

//Delete Post
app.delete('/blog/posts/:id',auth,multer, async (req, res) => {
    try {
        const id = req.params.id;
        const contactsDb = db.collection('posts').doc(id);
        const response = await contactsDb.delete()
        res.send({ response: response, message: 'Post supprimé!' })
    } catch (error) {
        res.send(error)
    }
})

//Update Post
app.put('/blog/post/:id',auth,multer,async(req,res)=>{
    try {
        const postJson = {
            id:req.params.id,
            titre: req.body.email,
            apperçu: req.body.name,
            couverture: req.body.message,
            blocs: req.body.blocs,
            categorie: req.body.categorie
        };
        const postsDb = db.collection('posts');
        const response = await postsDb.doc(postJson.id).set(postJson);
        res.send({ response: response, message: 'Post Modifié!' });

    } catch (error) {
        res.send(error);
    }
})


app.listen(4000, () => console.log('L\'appli est active sur le port 4000'));
