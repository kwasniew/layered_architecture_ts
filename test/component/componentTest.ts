import httpClient from "supertest";
import {appFactory} from "../../src/app";
import assert from "assert";
import {db} from "../../src/connection";

describe('Book inventory', function () {
    it('allows to stock up the items', async function () {
        const resolvedDb = await db;
        const app = appFactory(resolvedDb);
        const request =  httpClient(app);

        // CREATE
        const createResult = await request
            .post('/book')
            .send({
                title: "JavaScript in Action",
                authors: ["James Smith", "Kate Donovan"],
                isbn: "0123456789",
                description: "The ultimate JS book!"
            })
            .set('Content-Type', 'application/json')
            .expect(302);

        // READ
        const readResult = await request
            .get(createResult.header.location)
            .set('Accept', 'application/json')
            .expect(200);

        assert.deepStrictEqual(readResult.body, {
            title: "JavaScript in Action",
            authors: ["James Smith", "Kate Donovan"],
            "slug": "javascript-in-action",
            isbn: "0123456789",
            description: "The ultimate JS book!"
        });
    })
});