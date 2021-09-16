const {Client} = require("@notionhq/client")
require('dotenv').config();
var express = require('express');
var router = express.Router();
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})
require('dotenv').config();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Form Injection Registration'});
});

router.post("/", async function (req, res, next) {
    const {name, email, phone, address, gender, note} = req.body;
    console.table({name, email, phone, address, gender, note});
    // Send data to Notion by API
    await notion.pages.create({
        parent: {
            database_id: process.env.NOTION_DATABASE_ID,
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: name,
                        },
                    },
                ],
            },
            Email: {
                email: email,
            },
            PhoneNumber: {
                rich_text: [
                    {
                        text: {
                            content: phone,
                        },
                    },
                ],
            },
            Address: {
                rich_text: [
                    {
                        text: {
                            content: address,
                        },
                    },
                ],
            },
            Gender: {
                select: {
                    name: gender
                },
            },
            Note: {
                rich_text: [
                    {
                        text: {
                            content: note,
                        },
                    },
                ],
            },
        },
    });
    res.redirect('/');
});

module.exports = router;
