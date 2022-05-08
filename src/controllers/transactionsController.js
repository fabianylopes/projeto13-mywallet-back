import db from "../db.js";

export async function records(req, res){
    const user = req.headers.user;

    try {
        const recordsCollections = db.collection('records');
        const records = await recordsCollections.find({}).toArray();

        res.send(records);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function entryRecord(req, res){
    const entry = req.body;
    const user = res.locals.user;

    try {
        const entriesCollection = db.collection('entries');
        await entriesCollection.insertOne({
            ...entry,
            user: user
        });
        console.log('passei')
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);        
    }
}

export async function outRecord(req, res){
    const out = req.body;
    const user = res.locals.user;

    try {
        const outsCollection = db.collection('outs');
        await outsCollection.insertOne({
            ...out,
            user: user
        });

        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);        
    }
}
