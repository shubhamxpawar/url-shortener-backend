import { URL } from "../models/url.model.js";

import { nanoid } from "nanoid";

export async function handleGenerateShortId(req, res){
    const body = req.body
    if(!body) return res.status(400).send({err : 'url required'})
    const ID = nanoid(8)
    const result = await URL.create({
        shortID : ID,
        redirectURL : body.url,
        visitHistory : []
    })

    return res.send({id : ID})
}

export async function handleRedirection(req, res) {
    const ID = req.params.shortID
    const result = await URL.findOneAndUpdate({shortID : ID}, { $push : {
        visitHistory : {
            timestamp : Date.now()
        }
    }})
    res.redirect(result.redirectURL)
}